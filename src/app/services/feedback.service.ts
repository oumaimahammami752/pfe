import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/feedbacks'; // Ensure this matches your backend endpoint

  constructor(private http: HttpClient) {}

  // Update the method to use feedbackRating
  addFeedback(feedbackRating: number, reservationId: number): Observable<any> {
    const payload = {
      feedbackRating, // Now sending feedbackRating
      reservationId,
    };
    return this.http.post(`${this.apiUrl}/add`, payload);
  }

  getFeedbacksByMenuId(menuId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/menu/${menuId}`);
  }

  getAllFeedbacks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}
