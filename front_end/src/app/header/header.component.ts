import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  title = 'front_end';

  abrirPaginaSignIn() {
    const url = `/auth/sign-in`;
    this.router.navigate([url]);
  }

  abrirPaginaSignUp() {
    const url = `/auth/sign-up`;
    this.router.navigate([url]);
  }
}
