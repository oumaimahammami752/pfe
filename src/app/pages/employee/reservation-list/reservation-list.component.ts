import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-list-reservation',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    CommonModule,
    HeaderComponent,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatButton,
  ]
})
export class ListReservationComponent implements OnInit {
  displayedColumns1: string[] = [
    'reservationDate',
    'selectedSandwich',
    'selectedGarnish',
    'selectedMainCourse',
    'selectedDessert',
    'selectedEntree',
    'price',
    'actions'
  ];


  dataSource1 = new MatTableDataSource<any>();

  constructor(private reservationService: ReservationService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    const userId = Number(localStorage.getItem('id'));
    this.reservationService.getReservationsByUserId(userId).subscribe((response: any) => {
      console.log(response);
      this.dataSource1.data = response;
    });
  }

  openFeedbackDialog(reservation: any): void {
    this.dialog.open(FeedbackDialogComponent, {
      width: '350px',
      data: { reservation },
    });
  }
  isBeforeToday(reservationDate: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison
    const reservation = new Date(reservationDate);
    return reservation > today;
  }

  cancelReservation(reservationId: number): void {
    console.log(`Cancelling reservation ${reservationId}`);
    this.reservationService.cancelReservation(reservationId).subscribe({
      next: () => {
        console.log(`Reservation ${reservationId} cancelled successfully`);
        this.fetchReservations(); // Refresh the list after cancellation
      },
      error: (err) => console.error(err),
    });
  }
}
