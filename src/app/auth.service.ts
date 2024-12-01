import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/rest/auth/C'; // Replace with your API endpoint
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  // Method to log in
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };

    return this.http.post<any>(`${this.authUrl}/login`, loginData).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token); // Store the token in localStorage
        }
      })
    );
  }

  // Method to log out
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove the token
    location.reload();
    // Clear the state and reload the application
  }


  // Method to get the current token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Retrieve token from localStorage
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Return true if token exists
  }
}
