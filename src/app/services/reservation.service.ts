import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}


  getReservationsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations/all/${userId}`);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservations/all`);
  }

  cancelReservation(reservationId: number) {
    return this.http.delete(`${this.apiUrl}/reservations/cancel/${reservationId}`)
    };

  getFeedbackCounts(date: Date): Observable<{ GOOD: number; AVERAGE: number; BAD: number }> {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    return this.http.get<{ GOOD: number; AVERAGE: number; BAD: number }>(
      `http://localhost:8080/api/feedbacks/count?date=${formattedDate}`
    );
  }

  // Check if reservations are allowed today
  checkReservationStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/reservations/checkReservationStatus`);
  }

}
