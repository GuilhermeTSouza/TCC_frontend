import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'front_end';
  logado = false;

  abrirPaginaSignIn() {
    const url = `/signin`;
    this.router.navigate([url]);
  }

  abrirPaginaSignUp() {
    const url = `/signup`;
    this.router.navigate([url]);
  }

  abrirPaginaIntroduction() {
    const url = `/introduction`;
    this.router.navigate([url]);
  }

  abrirPaginaCourses() {
    const url = `/courses`;
    this.router.navigate([url]);
  }

  abrirPaginaClassroom() {
    const url = `/classroom`;
    this.router.navigate([url]);
  }

  abrirPaginaInstructor() {
    const url = `/instructor`;
    this.router.navigate([url]);
  }

  abrirPaginaTeacher() {
    const url = `/teacher`;
    this.router.navigate([url]);
  }

  abrirPaginaSupport() {
    const url = `/support`;
    this.router.navigate([url]);
  }
}
