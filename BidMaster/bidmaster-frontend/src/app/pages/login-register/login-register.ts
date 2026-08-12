import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login, LoginPayload } from '../../components/login/login';
import { Register, RegisterPayload } from '../../components/register/register';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, Login, Register],
  templateUrl: './login-register.html',
  styleUrl: './login-register.css',
})
export class LoginRegister {
  mode: AuthMode = 'login';

  constructor(private route: ActivatedRoute, private router: Router) {
    // Mod (login/register) se određuje na osnovu rute, tako da /prijava i
    // /registracija otvaraju istu stranicu sa različitim aktivnim tabom.
    this.route.data.subscribe((data) => {
      this.mode = (data['mode'] as AuthMode) ?? 'login';
    });
  }

  switchTo(mode: AuthMode): void {
    this.router.navigateByUrl(mode === 'login' ? '/prijava' : '/registracija');
  }

  onLogin(payload: LoginPayload): void {
    console.log('Login payload:', payload);
  }

  onRegister(payload: RegisterPayload): void {
    console.log('Register payload:', payload);
  }
}