import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService implements OnModuleInit {
    private readonly jwtService;
    private readonly users;
    constructor(jwtService: JwtService);
    onModuleInit(): Promise<void>;
    validateUser(role: string, employeeID: string, password: string): Promise<any>;
    login(user: any): {
        access_token: string;
    };
}
