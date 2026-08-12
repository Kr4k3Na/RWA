import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  @Output() register = new EventEmitter<RegisterPayload>();

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptedTerms = false;

  submitting = false;
  errorMessage: string | null = null;

  get passwordsMismatch(): boolean {
    return !!this.confirmPassword && this.password !== this.confirmPassword;
  }

  submit(form: NgForm): void {
    if (form.invalid || this.passwordsMismatch || !this.acceptedTerms) {
      form.form.markAllAsTouched();
      if (!this.acceptedTerms) {
        this.errorMessage = 'Moraš prihvatiti uslove korišćenja.';
      }
      return;
    }

    this.errorMessage = null;
    this.submitting = true;

    // Emituje payload ka roditeljskoj/kontejner komponenti (login-register page)
    // koja se povezuje sa auth servisom/API-jem.
    this.register.emit({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      acceptedTerms: this.acceptedTerms,
    });

    // Placeholder — ukloni kada auth servis bude povezan.
    setTimeout(() => (this.submitting = false), 600);
  }
}
