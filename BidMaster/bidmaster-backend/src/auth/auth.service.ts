import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.userService.findOne({ email });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if(!isPasswordValid) return null;

        const { password, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                lastName: user.lastName
            }
        }
    }

    async register(dto: CreateUserDto) {
        const userExists = await this.userService.findOne({ email: dto.email });
        if (userExists) return null;
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.userService.create({
            ...dto,
            password: hashedPassword,
        });
        return this.login(user);
    }
}
