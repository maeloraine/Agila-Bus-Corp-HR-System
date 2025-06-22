import { HttpService } from '@nestjs/axios';
export declare class RolesController {
    private readonly httpService;
    constructor(httpService: HttpService);
    getRoles(): Promise<any>;
}
