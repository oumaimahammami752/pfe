import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken'); // Example: Check for token
    if (!token) {
      this.router.navigate(['/authentication/login']);
      return false;
    }
    return true;
  }
}
