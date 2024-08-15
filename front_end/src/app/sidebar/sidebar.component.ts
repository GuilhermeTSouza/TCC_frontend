import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router, private signInService: SignInService) {}

  abrirPaginaIntroduction() {
    const url = '/introduction';
    this.router.navigate([url]);
  }

  abrirPaginaCourse() {
    let url = '/';
    if (this.signInService.logado) {
      url = '/course';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaClassroom() {
    let url = '/';
    if (this.signInService.logado) {
      url = '/classroom';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaInstructor() {
    let url = '/';
    if (this.signInService.logado) {
      url = '/instructor';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaTeacher() {
    let url = '/';
    if (this.signInService.logado) {
      url = '/teacher';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaClass() {
    let url = '/';
    if (this.signInService.logado) {
      url = '/class';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }

  abrirPaginaSupport() {
    let url = '/';
    if (this.signInService.logado) {
      url = '/support';
    } else {
      alert('Você precisa estar logado para continuar');
      url = '/auth/sign-in';
    }
    this.router.navigate([url]);
  }
}
