import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userInitial: string = '';
  title = 'front_end';
  currentTheme: string = 'light';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTheme();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.username) {
        this.userInitial = parsedUser.username.charAt(0).toUpperCase();
      }
    }
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
    const url = '/auth/sign-in';
    this.router.navigate([url]);
  }

  abrirPaginaSignUp(): void {
    const url = '/auth/sign-up';
    this.router.navigate([url]);
  }
}
