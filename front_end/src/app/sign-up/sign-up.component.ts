import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [FormsModule, NgIf],
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  usernameError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;
  confirmPasswordError: string | null = null;

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {}

  validateEmail(email: string): boolean {
    // Verifica se o email tem o formato correto e termina com @gmail.com
    const emailPattern = /^[^\s@]+@[^\s@]+\.com$/;
    const domainCheck = email.endsWith('@gmail.com');
    return emailPattern.test(email) && domainCheck;
  }
  

  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(password);
  }

  signUp(): void {
    this.resetErrors();

    if (!this.validateEmail(this.email)) {
      this.emailError = 'Email inválido!';
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.passwordError =
        'A senha deve ter pelo menos 8 caracteres, 1 número e 1 caractere especial!';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'As senhas não coincidem!';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.authService.logado = true;

    const url = `/introduction`;
    this.router.navigate([url]);

    alert('Conta criada com sucesso!');
    this.errorMessage = null;
  }

  resetErrors(): void {
    this.emailError = null;
    this.passwordError = null;
    this.confirmPasswordError = null;
  }

  goBack(): void {
    this.location.back();
  }

  abrirPaginaSignIn() {
    const url = '/auth/sign-in';
    this.router.navigate([url]);
  }
}
