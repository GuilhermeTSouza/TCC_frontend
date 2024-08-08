import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }
}
