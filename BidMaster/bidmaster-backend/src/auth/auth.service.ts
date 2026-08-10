import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async validateUser(email: string, pass: string) {
        const user = await this.userService.findOne({ email });
        // hash value to string
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        return result;
    }

    async login(email: string, pass: string) {
        return await this.validateUser(email, pass);
    }

    async register(dto: CreateUserDto) {
        const email = dto.email;
        const user = this.userService.findOne({ email });
        if(!user) {
            // hash password
            return await this.userService.create(dto);
        }
        else return null;
    }
}
