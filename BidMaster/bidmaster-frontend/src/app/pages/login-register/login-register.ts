import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login, LoginPayload } from '../../components/login/login';
import { Register, RegisterPayload } from '../../components/register/register';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';

type AuthMode = 'login' | 'register';

@Component({
  selector: 'app-login-register',
  imports: [CommonModule, Login, Register],
  templateUrl: './login-register.html',
  styleUrl: './login-register.css',
})
export class LoginRegister {
  mode: AuthMode = 'login';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
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
    this.store.dispatch(AuthActions.login({ 
      email: payload.email, 
      password: payload.password 
    }));
  }

  onRegister(payload: RegisterPayload): void {
    console.log('Register payload:', payload);
    this.store.dispatch(AuthActions.register({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password
    }))
  }
}