/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
// Import necessary modules from NestJS for creating controllers, handling HTTP requests, etc.
import { Controller, Post, Body, HttpCode, HttpStatus, Res, UnauthorizedException, BadRequestException } from '@nestjs/common';
// Import the AuthService to handle authentication logic.
import { AuthService } from '../auth-ms.service';
// Import the LoginDto to define the expected shape of the login request body.
import { LoginDto } from './dto/login.dto';
// Import the Response object from Express to manipulate HTTP responses (e.g., set cookies).
import { Response } from 'express';
// Import the PrismaClient for database interactions.
import { PrismaClient } from '@prisma/client';
// Import argon2 for password hashing.
import * as argon2 from 'argon2';
// Import crypto for generating random bytes (e.g., for tokens).
import * as crypto from 'crypto';
// Import addMinutes from date-fns to calculate token expiry times.
import { addMinutes } from 'date-fns';
import { EmailService } from '../email/email.service';
import { generateEmployeeId, generateRandomPassword } from '../utils/generators';


// Initialize a single instance of PrismaClient to be used throughout the controller.
const prisma = new PrismaClient(); // <-- Only need one Prisma client

// Define the controller with the base route 'auth'.
@Controller('auth')
export class AuthController {
  // Inject the AuthService into the controller.
  constructor(
    private readonly authService: AuthService, 
    private readonly emailService: EmailService,
  ){} 

  /**
   * Handles user login.
   * Validates credentials, generates a JWT, and sets it as an HTTP-only cookie.
   */
  @Post('login') // Defines this method as a handler for POST requests to '/auth/login'.
  @HttpCode(HttpStatus.OK) // Sets the HTTP status code to 200 (OK) for successful responses.
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    // Validate the user's role, employeeID, and password using the AuthService.
    const user = await this.authService.validateUser(loginDto.role, loginDto.employeeID, loginDto.password);
    // If validation fails (user not found or credentials incorrect), throw an UnauthorizedException.
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // If validation is successful, generate an access token.
    const { access_token } = this.authService.login(user);
    // Set the access token as an HTTP-only cookie.
    res.cookie('jwt', access_token, {
      httpOnly: true, // The cookie cannot be accessed by client-side JavaScript.
      secure: process.env.NODE_ENV === 'production', // The cookie will only be sent over HTTPS in production.
      sameSite: 'strict', // Mitigates CSRF attacks.
      maxAge: 3600 * 1000, // Cookie expiry time set to 1 hour (in milliseconds).
    });
    // Return a success message.
    return { message: 'Login successful' };
  }

  /**
   * Handles new user registration.
   * Checks if the user already exists, hashes the password, and stores the new user in the database.
   */
  @Post('register') // Defines this method as a handler for POST requests to '/auth/register'.
  @HttpCode(HttpStatus.CREATED) // Sets the HTTP status code to 201 (Created) for successful responses.
  async register(@Body() body: { 
    employeeId: string; 
    role: string; 
    email: string, 
    birthdate: Date, 
    firstName: string, 
    lastName: string,
    phone?: string,
    streetAddress?: string,
    city?: string,
    province?: string,
    zipCode?: string,
    country?: string,
    securityQuestion?: string,
    securityAnswerHash?: string,}) {
    const { employeeId, role, email, birthdate, firstName, lastName, phone, streetAddress, city, province, zipCode, country, securityQuestion, securityAnswerHash } = body;
    

    // Check if a user with the given employeeId already exists in the database.
    const existing = await prisma.user.findUnique({ where: { employeeId } });
    // If the user already exists, throw a BadRequestException.
    if (existing) {
      throw new BadRequestException('User already exists');
    }
    
   // Generate a new employee ID if not provided.
    const tempPassword = generateRandomPassword(); // Generate a random password if not provided.
    // Hash the provided password using argon2 (argon2id algorithm).
    const passwordhash = await argon2.hash(tempPassword, { type: argon2.argon2id });
    const securityAnswer = body.securityAnswerHash ?? '';
    const AnswerHash = await argon2.hash(securityAnswer, { type: argon2.argon2id });
    // Create the new user in the database with the hashed password.
    const user = await prisma.user.create({
      data: { employeeId, role, password: passwordhash, email, birthdate, firstName, lastName, phone, streetAddress, city, province, zipCode, country, securityQuestion, securityAnswerHash: AnswerHash },
    });

    await this.emailService.sendWelcomeEmail(user.email, user.employeeId, tempPassword); // Send a welcome email with the temporary password.
    // Return a success message and the newly created user's basic information.
    return { message: 'User registered successfully', user: {
      id: user.id, 
      employeeID: user.employeeId, 
      role: user.role, 
      email: user.email, 
      birthdate: user.birthdate, 
      firstName: user.firstName, 
      lastName: user.lastName,
      phone: user.phone,
      streetAddress: user.streetAddress,
      city: user.city,
      province: user.province,
      zipCode: user.zipCode,
      country: user.country,
      securityQuestion: user.securityQuestion,
      securityAnswerHash: user.securityAnswerHash,
      message: 'User Registered. Email Sent'} };;
  }

  /**
   * Handles requests to initiate a password reset.
   * Generates a reset token and expiry, and stores them in the database for the user.
   */
  @Post('request-reset') // Defines this method as a handler for POST requests to '/auth/request-reset'.
  @HttpCode(HttpStatus.OK) // Sets the HTTP status code to 200 (OK) for successful responses.
  async requestReset(@Body() body: { employeeId: string }) {
      // Find the user by employeeId.
      const user = await prisma.user.findUnique({ where: { employeeId: body.employeeId } });
      // If no user is found with that employeeId, throw a BadRequestException.
      if (!user) {
        throw new BadRequestException('No such user');
      }

    // Generate a secure random token (32 bytes, hex encoded).
    const token = crypto.randomBytes(32).toString('hex');
    // Set the token expiry time to 15 minutes from the current time.
    const expiry = addMinutes(new Date(), 15); // 15 MINS

    // Update the user record in the database with the reset token and its expiry time.
    await prisma.user.update({
      where : { employeeId: body.employeeId },
      data  : { resetToken: token, resetTokenExpiry: expiry },
    });

    if (!user.email) {
      throw new BadRequestException('User does not have a valid email address');
    }
    await this.emailService.sendResetEmail(user.email, token); // Send the reset email to the user.

    // Return a success message and the generated token (for sending via email, etc.).
    return { message: 'Rest token generated', token };
  }

  /**
   * Handles the actual password reset using a token.
   * Verifies the token, checks its expiry, and updates the user's password.
   */
  @Post('reset-password') // Defines this method as a handler for POST requests to '/auth/reset-password'.
  @HttpCode(HttpStatus.OK) // Sets the HTTP status code to 200 (OK) for successful responses.
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    // Find the user based on the provided reset token.
    // Also, ensure the token has not expired (resetTokenExpiry > current time).
    const user = await prisma.user.findFirst({
      where: {
        resetToken: body.token,
        resetTokenExpiry: {
          gt: new Date()}, // 'gt' means "greater than", ensuring the token is not expired.
      },
    });

    // If no user is found with a valid, non-expired token, throw a BadRequestException.
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash the new password using argon2 (argon2id algorithm).
    const hash = await argon2.hash(body.newPassword, {type: argon2.argon2id});

    // Update the user's password in the database.
    // Also, clear the reset token and its expiry time to prevent reuse.
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hash,
        resetToken: null, // Clear the reset token.
        resetTokenExpiry: null, // Clear the reset token expiry.
      },
    });

    // Return a success message.
    return { message: 'Password reset Successfully' };
  }

  @Post('first-password-reset')
  @HttpCode(HttpStatus.OK)
  async firstPasswordReset(@Body() body: { employeeId: string; newPassword: string }) {
    const user = await prisma.user.findUnique({
      where: { employeeId: body.employeeId },
    });
    if (!user) throw new BadRequestException('No such user');

    if (!user.mustChangePassword) throw new BadRequestException('Password already set');

    const hash = await argon2.hash(body.newPassword, { type: argon2.argon2id });
    await prisma.user.update({
      where: { employeeId: body.employeeId },
      data: {
        password: hash,
        mustChangePassword: false, // Set mustChangePassword to false after the first password reset.
      },
    });

    return { message: 'Password reset successfully' };
  }
  /**
   * Handles user logout.
   * Clears the JWT cookie.
   */
  @Post('logout') // Defines this method as a handler for POST requests to '/auth/logout'.
  @HttpCode(HttpStatus.OK) // Sets the HTTP status code to 200 (OK) for successful responses.
  logout(@Res({ passthrough: true }) res: Response) {
    // Clear the 'jwt' cookie.
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    // Return a success message.
    return { message: 'Logged out successfully' };
  }
}