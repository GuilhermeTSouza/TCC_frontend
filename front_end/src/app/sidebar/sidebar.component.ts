import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}
  
  abrirPaginaIntroduction() {
    const url = `/introduction`;
    this.router.navigate([url]);
  }

  abrirPaginaCourse() {
    const url = `/course`;
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

  abrirPaginaClass() {
    const url = `/class`;
    this.router.navigate([url]);
  }

  abrirPaginaSupport() {
    const url = `/support`;
    this.router.navigate([url]);
  }
}
