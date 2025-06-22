import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(credentials: LoginDto): Promise<any>;
    firstResetPassword(body: {
        employeeId: string;
        newPassword: string;
    }): Promise<any>;
    requestSecurityQuestion(email: string): Promise<any>;
    validateSecurityAnswer(body: {
        email: string;
        answer: string;
    }): Promise<any>;
    resetPassword(body: {
        token: string;
        newPassword: string;
    }): Promise<any>;
    logout(response: Response): Promise<any>;
}
