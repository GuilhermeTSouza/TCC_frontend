import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule],
})
export class HeaderComponent implements OnInit {
  userInitial: string = '';
  title = 'front_end';
  currentTheme: string = 'light';
  isLoggedIn: boolean = false;
  userColor: string = ''; // Armazena a cor sorteada
  isDropdownOpen: boolean = false;

  // Dicionário de cores
  colors: string[] = ['#ef378a', '#18cfc3', '#ff8700', '#3754c6', '#28c241'];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTheme();
    this.checkLoginStatus();
    this.updateUserInitial();
    this.setUserColor(); // Define a cor do usuário
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

  abrirPaginaPerfil(): void {
    const url = `/auth/profile`;
    this.router.navigate([url]);
  }

  logout(): void {
    this.authService.logado = false;
    this.isLoggedIn = false;
    this.router.navigate(['/auth/sign-in']);
  }

  private checkLoginStatus(): void {
    this.isLoggedIn = this.authService.logado;
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

  // Define a cor do usuário
  private setUserColor(): void {
    const storedColor = localStorage.getItem('userColor');
    if (storedColor) {
      this.userColor = storedColor;
    } else {
      this.userColor =
        this.colors[Math.floor(Math.random() * this.colors.length)];
      localStorage.setItem('userColor', this.userColor);
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
