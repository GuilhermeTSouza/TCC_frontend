import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importa o FormsModule
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [FormsModule], // Adiciona FormsModule nas imports
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {}

  goBack(): void {
    this.location.back();
  }

  logar() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (
        this.username === parsedUser.username &&
        this.password === parsedUser.password
      ) {
        this.authService.logado = true;
        console.log(this.authService.logado);
        const url = `/introduction`;
        this.router.navigate([url]);
      } else {
        alert('Nome de usuário ou senha incorretos.');
      }
    } else {
      alert('Usuário não encontrado. Por favor, cadastre-se.');
    }
  }

  abrirPaginaSignUp() {
    const url = "/auth/sign-up"
    this.router.navigate([url]);
  }
}
