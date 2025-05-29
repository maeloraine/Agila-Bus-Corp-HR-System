"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_ms_service_1 = require("../auth-ms.service");
const login_dto_1 = require("./dto/login.dto");
const client_1 = require("@prisma/client");
const argon2 = require("argon2");
const crypto = require("crypto");
const date_fns_1 = require("date-fns");
const email_service_1 = require("../email/email.service");
const generators_1 = require("../utils/generators");
const prisma = new client_1.PrismaClient();
let AuthController = class AuthController {
    authService;
    emailService;
    constructor(authService, emailService) {
        this.authService = authService;
        this.emailService = emailService;
    }
    async login(loginDto, res) {
        const user = await this.authService.validateUser(loginDto.role, loginDto.employeeID, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { access_token } = this.authService.login(user);
        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 * 1000,
        });
        return { message: 'Login successful' };
    }
    async register(body) {
        const { employeeId, role, email, birthdate, firstName, lastName, phone, streetAddress, city, province, zipCode, country, securityQuestion, securityAnswerHash } = body;
        const existing = await prisma.user.findUnique({ where: { employeeId } });
        if (existing) {
            throw new common_1.BadRequestException('User already exists');
        }
        const tempPassword = (0, generators_1.generateRandomPassword)();
        const passwordhash = await argon2.hash(tempPassword, { type: argon2.argon2id });
        const securityAnswer = body.securityAnswerHash ?? '';
        const AnswerHash = await argon2.hash(securityAnswer, { type: argon2.argon2id });
        const user = await prisma.user.create({
            data: { employeeId, role, password: passwordhash, email, birthdate, firstName, lastName, phone, streetAddress, city, province, zipCode, country, securityQuestion, securityAnswerHash: AnswerHash },
        });
        await this.emailService.sendWelcomeEmail(user.email, user.employeeId, tempPassword);
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
                message: 'User Registered. Email Sent'
            } };
        ;
    }
    async requestReset(body) {
        const user = await prisma.user.findUnique({ where: { employeeId: body.employeeId } });
        if (!user) {
            throw new common_1.BadRequestException('No such user');
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expiry = (0, date_fns_1.addMinutes)(new Date(), 15);
        await prisma.user.update({
            where: { employeeId: body.employeeId },
            data: { resetToken: token, resetTokenExpiry: expiry },
        });
        if (!user.email) {
            throw new common_1.BadRequestException('User does not have a valid email address');
        }
        await this.emailService.sendResetEmail(user.email, token);
        return { message: 'Rest token generated', token };
    }
    async resetPassword(body) {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: body.token,
                resetTokenExpiry: {
                    gt: new Date()
                },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        const hash = await argon2.hash(body.newPassword, { type: argon2.argon2id });
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hash,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        return { message: 'Password reset Successfully' };
    }
    async firstPasswordReset(body) {
        const user = await prisma.user.findUnique({
            where: { employeeId: body.employeeId },
        });
        if (!user)
            throw new common_1.BadRequestException('No such user');
        if (!user.mustChangePassword)
            throw new common_1.BadRequestException('Password already set');
        const hash = await argon2.hash(body.newPassword, { type: argon2.argon2id });
        await prisma.user.update({
            where: { employeeId: body.employeeId },
            data: {
                password: hash,
                mustChangePassword: false,
            },
        });
        return { message: 'Password reset successfully' };
    }
    logout(res) {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return { message: 'Logged out successfully' };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('request-reset'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestReset", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('first-password-reset'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "firstPasswordReset", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_ms_service_1.AuthService,
        email_service_1.EmailService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map