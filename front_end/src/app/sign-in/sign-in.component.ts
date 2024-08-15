import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { SignInService } from '../services/sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(
    private router: Router,
    private location: Location,
    private signInService: SignInService
  ) {}

  goBack(): void {
    this.location.back();
  }

  logar() {
    this.signInService.logado = true;
    console.log(this.signInService.logado);
    const url = `/introduction`;
    this.router.navigate([url]);
  }
}
