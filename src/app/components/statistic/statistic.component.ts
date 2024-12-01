import { Component, OnInit } from '@angular/core';
import { ReservationService } from "../../services/reservation.service";
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

interface Statistics {
  sandwichStats: { [key: string]: number };
  entreeStats: { [key: string]: number };
  dessertStats: { [key: string]: number };
  garnishStats: { [key: string]: number };
  mainCourseStats: { [key: string]: number };
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    PaginatorModule,
    DatePipe,
    KeyValuePipe,
    NgForOf,
    NgIf,
  ]
})
export class StatisticComponent implements OnInit {
  reservations: any[] = [];
  statisticsByDate: { [date: string]: Statistics } = {};
  selectedDate: string | undefined = undefined; // Ensure it's `undefined` instead of `null`

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  fetchReservations(): void {
    this.reservationService.getAll().subscribe(
      (response: any) => {
        console.log('Fetched reservations:', response);
        this.reservations = response;
        this.calculateStatistics();
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  calculateStatistics(): void {
    this.reservations.forEach(reservation => {
      const date = reservation.reservationDate;

      if (!this.statisticsByDate[date]) {
        this.statisticsByDate[date] = {
          sandwichStats: {},
          entreeStats: {},
          dessertStats: {},
          garnishStats: {},
          mainCourseStats: {}
        };
      }

      if (reservation.selectedSandwich) {
        this.statisticsByDate[date].sandwichStats[reservation.selectedSandwich] =
          (this.statisticsByDate[date].sandwichStats[reservation.selectedSandwich] || 0) + 1;
      }
      if (reservation.selectedEntree) {
        this.statisticsByDate[date].entreeStats[reservation.selectedEntree] =
          (this.statisticsByDate[date].entreeStats[reservation.selectedEntree] || 0) + 1;
      }
      if (reservation.selectedDessert) {
        this.statisticsByDate[date].dessertStats[reservation.selectedDessert] =
          (this.statisticsByDate[date].dessertStats[reservation.selectedDessert] || 0) + 1;
      }
      if (reservation.selectedGarnish) {
        this.statisticsByDate[date].garnishStats[reservation.selectedGarnish] =
          (this.statisticsByDate[date].garnishStats[reservation.selectedGarnish] || 0) + 1;
      }
      if (reservation.selectedMainCourse) {
        this.statisticsByDate[date].mainCourseStats[reservation.selectedMainCourse] =
          (this.statisticsByDate[date].mainCourseStats[reservation.selectedMainCourse] || 0) + 1;
      }
    });
  }

  getStatsArray(statsObj: { [key: string]: number }): { name: string; count: number }[] {
    console.log('Stats Object:', statsObj);  // Log the stats object
    return Object.entries(statsObj).map(([name, count]) => ({ name, count }));
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
  }

  fetchStatistics() {
    console.log('Fetching statistics for:', this.selectedDate);
    // Only fetch statistics for the selected date
    if (this.selectedDate && this.statisticsByDate[this.selectedDate]) {
      this.displayStatisticsForSelectedDate(this.selectedDate);
    } else {
      console.log('No statistics found for this date.');
    }
  }

  displayStatisticsForSelectedDate(date: string) {
    const statistics = this.statisticsByDate[date];
    // Here you would update the UI with the statistics for the selected date
    console.log('Statistics for selected date:', statistics);
  }
}
