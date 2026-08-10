
import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto.email, loginDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerDto: CreateUserDto) {
        return this.authService.register(registerDto);
    }
}
