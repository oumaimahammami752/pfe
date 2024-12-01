import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {CommonModule, DatePipe, formatDate} from '@angular/common';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import {ReservationService} from "../../../services/reservation.service";

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatTableModule,
    DatePipe,
    CommonModule,
    MatOption,
    MatSelect,
    FormsModule
  ],
  providers: [DatePipe]
})
export class ReservationComponent implements OnInit {
  displayedColumns1: string[] = [
    'reservationDate',
    'selectedSandwich',
    'selectedGarnish',
    'selectedMainCourse',
    'selectedDessert',
    'selectedEntree',
    'feedback',
    'price'
  ];
  dataSource1 = new MatTableDataSource<any>();
  selectedDate: Date | null = null;
  feedbackRating: string = ''; // Text to display the average rating

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.reservationService.getAll().subscribe((response: any) => {
      console.log(response);
      this.dataSource1.data = response;
    });
  }

  calculateFeedbackRating(): void {
    if (!this.selectedDate) {
      return;
    }

    // Format the selected date as 'YYYY-MM-DD' for comparison
    const selectedDateString = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');

    // Filter feedbacks by the selected date
    const filteredFeedbacks = this.dataSource1.data.filter(
      (reservation: any) => formatDate(reservation.reservationDate, 'yyyy-MM-dd', 'en-US') === selectedDateString
    );

    // Calculate the average feedback rating (numeric)
    let totalRating = 0;
    let count = 0;

    filteredFeedbacks.forEach((reservation: any) => {
      const feedbackRating = reservation.feedbacks?.[0]?.feedbackRating; // Get the numeric feedback rating
      if (feedbackRating !== undefined) {
        totalRating += feedbackRating;
        count++;
      }
    });

    if (count > 0) {
      this.feedbackRating = (totalRating / count).toFixed(1) + " /10 {satisfactions} ";  // Display average rating with 1 decimal point and append "/10"
    } else {
      this.feedbackRating = "No Rating";  // If no feedback exists for the selected date
    }

  }
}
