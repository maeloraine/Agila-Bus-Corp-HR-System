import { HttpService } from '@nestjs/axios';
export declare class AuthController {
    private readonly httpService;
    constructor(httpService: HttpService);
    login(credentials: any): Promise<any>;
}
