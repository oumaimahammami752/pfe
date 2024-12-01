import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PricesService {
  private baseUrl = 'http://localhost:8080/rest/auth'; // Adjust if different

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }
  deleteUser(userId: number): Observable<any> {
    console.log('Sending DELETE request for user ID:', userId); // Debug
    return this.http.delete<any>(`${this.baseUrl}/users/${userId}`);
  }

  // Method to edit/update a user
  editUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users/${userId}`, userData);
  }
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

}
