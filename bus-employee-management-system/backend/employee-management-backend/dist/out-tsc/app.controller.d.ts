import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    pingAuth(): Promise<string>;
    getHello(): string;
}
