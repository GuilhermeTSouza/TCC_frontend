import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from '../../sign-in/sign-in.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, SignInComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthLayoutComponent {}
