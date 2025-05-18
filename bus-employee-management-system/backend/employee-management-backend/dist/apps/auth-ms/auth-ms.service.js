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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    jwtService;
    users = [
        {
            id: 1,
            username: 'admin123',
            role: 'Admin',
            password: '',
        },
        {
            id: 2,
            username: 'hr123',
            role: 'HR Manager',
            password: '',
        },
        {
            id: 3,
            username: 'accountant123',
            role: 'Accountant',
            password: '',
        },
    ];
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async onModuleInit() {
        for (const user of this.users) {
            user.password = await argon2.hash(user.username === 'admin123' ? 'Password@123' :
                user.username === 'hr123' ? 'Hr@12345' : 'Account@123', { type: argon2.argon2id });
        }
    }
    async validateUser(role, employeeID, password) {
        const user = await (async () => {
            for (const u of this.users) {
                if (u.username === employeeID && await argon2.verify(u.password, password)) {
                    return u;
                }
            }
            return undefined;
        })();
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    login(user) {
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth-ms.service.js.map