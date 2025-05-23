import { HttpService } from '@nestjs/axios';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly httpService;
    constructor(httpService: HttpService);
    login(credentials: LoginDto): Promise<any>;
}
