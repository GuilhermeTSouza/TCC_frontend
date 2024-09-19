import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  defaultColor = '#4F46E5';
  user = {
    username: 'User',
    email: 'user@example.com',
    password: 'password123',
    userColor: this.defaultColor,
  };
  showPassword = false;

  ngOnInit(): void {
    // Obtain the color from localStorage
    const storedColor = localStorage.getItem('userColor');
    if (storedColor) {
      this.user.userColor = storedColor;
    } else {
      this.user.userColor = this.defaultColor;
    }
  }

  editProfile() {
    // Logic for editing the profile
    alert('Sla');
  }
}
