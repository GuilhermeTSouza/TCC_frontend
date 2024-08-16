import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importe o CommonModule
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule], // Adicione CommonModule aqui
})
export class HeaderComponent implements OnInit {
  userInitial: string = '';
  title = 'front_end';
  currentTheme: string = 'light';
  isLoggedIn: boolean = false; // Nova propriedade

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTheme();
    this.checkLoginStatus(); // Atualize o status de login
    this.updateUserInitial();
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      this.applyTheme(this.currentTheme);
    } else {
      this.applyTheme(this.currentTheme);
    }
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  applyTheme(theme: string): void {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  abrirPaginaSignIn(): void {
    const url = `/auth/sign-in`;
    this.router.navigate([url]);
  }

  abrirPaginaSignUp(): void {
    const url = `/auth/sign-up`;
    this.router.navigate([url]);
  }

  private checkLoginStatus(): void {
    this.isLoggedIn = this.authService.logado; // Use a propriedade logado do AuthService
  }

  private updateUserInitial(): void {
    if (this.isLoggedIn) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.username) {
          this.userInitial = parsedUser.username.charAt(0).toUpperCase();
        }
      }
    }
  }
}
