import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() login = new EventEmitter<LoginPayload>();

  email = '';
  password = '';
  rememberMe = false;

  submitting = false;
  errorMessage: string | null = null;

  submit(form: NgForm): void {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    this.errorMessage = null;
    this.submitting = true;

    // Emituje payload ka roditeljskoj/kontejner komponenti (login-register page)
    // koja se povezuje sa auth servisom/API-jem.
    this.login.emit({
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });

    // Placeholder — ukloni kada auth servis bude povezan.
    setTimeout(() => (this.submitting = false), 600);
  }
}
