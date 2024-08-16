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

  constructor(
    private location: Location,
    private router: Router, // Injetando o Router
    private authService: AuthService // Injetando o AuthService
  ) {}

  goBack(): void {
    this.location.back();
  }

  signUp(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem!';
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    localStorage.setItem('user', JSON.stringify(user));

    // Marcar como logado no AuthService
    this.authService.logado = true;
    console.log(this.authService.logado);

    // Navegar para a página de introdução
    const url = `/introduction`;
    this.router.navigate([url]);

    alert('Conta criada com sucesso!');
    this.errorMessage = null;
  }
}
