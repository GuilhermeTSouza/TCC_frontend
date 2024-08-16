import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  abrirPaginaIntroduction() {
    const url = '/introduction';
    this.router.navigate([url]);
  }

  abrirPaginaCourse() {
    let url = '/';
    if (this.authService.logado) {
      url = '/course';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaClassroom() {
    let url = '/';
    if (this.authService.logado) {
      url = '/classroom';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaInstructor() {
    let url = '/';
    if (this.authService.logado) {
      url = '/instructor';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaTeacher() {
    let url = '/';
    if (this.authService.logado) {
      url = '/teacher';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaClass() {
    let url = '/';
    if (this.authService.logado) {
      url = '/class';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaSupport() {
    let url = '/';
    if (this.authService.logado) {
      url = '/support';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }
}
