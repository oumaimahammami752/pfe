import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ReservationService} from "../../../services/reservation.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-make-reservation',
  templateUrl: './make-reservation.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./make-reservation.component.css']
})
export class MakeReservationComponent implements OnInit {
  currentMenus: any[] = [];
  reservations: any[] = [];
  selectedOptions: { [date: string]: { [key: string]: string | null } } = {};
  totalMenus: any[] = [];
  days: Date[] = [];
  message: string | null = null;
  success: boolean = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.fetchReservations().then(r => this.loadMenus())
  }

  ngOnDestroy(): void {
  }
  async fetchReservations(): Promise<void> {
    const userId = Number(localStorage.getItem('id'));

    try {
      const response = await firstValueFrom(this.reservationService.getReservationsByUserId(userId));
      console.log(response);
      this.reservations = response;
    } catch (error) {
      console.error('Error fetching reservations', error);
    }
  }

  initializeSelectedOptions(): void {
    this.days.forEach(day => {
      const dateStr = day.toDateString();
      // Initialize each day with default values if it doesn't already exist
      this.selectedOptions[dateStr] = {
        id: null,
        entree: null,
        mainCourse: null,
        garnish: null,
        dessert: null,
        sandwich: null
      };
      // Update with reservation data if available
      this.reservations.forEach(reservation => {
        const reservationDate = new Date(reservation.reservationDate).toDateString();
        if (reservationDate === dateStr) {
          this.selectedOptions[dateStr] = {
            id: reservation.id,
            entree: reservation.selectedEntree,
            mainCourse: reservation.selectedMainCourse,
            garnish: reservation.selectedGarnish,
            dessert: reservation.selectedDessert,
            sandwich: reservation.selectedSandwich,
          };
        }
      });
    });
  }

  isSelected(day: Date, type: string, option: string): boolean {
    const dateStr = day.toDateString();
    return this.selectedOptions[dateStr]?.[type] === option;
  }

  selectOption(day: Date, type: string, option: string): void {
    const dateStr = day.toDateString();

    // Set the selected option for the day
    this.selectedOptions[dateStr][type] = option;

    // Deselect sandwiches if a meal option is selected
    if (type !== 'sandwich') {
      this.selectedOptions[dateStr]['sandwich'] = null; // Deselect sandwich
    }

    // Deselect meal options if a sandwich is selected
    if (type === 'sandwich') {
      Object.keys(this.selectedOptions[dateStr]).forEach(key => {
        if (key !== 'sandwich' && key !== 'id') {
          this.selectedOptions[dateStr][key] = null; // Deselect all meals
        }
      });
    }
  }

  getSandwichesForDay(day: Date): string[] {
    const dateStr = day.toDateString();

    // Find all menus that match the given date
    const menusForDay = this.currentMenus.filter(menu => new Date(menu.date).toDateString() === dateStr);

    // Collect all sandwiches from those menus
    return menusForDay.flatMap(menu => menu.sandwiches || []);
  }


  // Load all menus and set up the days for the table
  loadMenus(): void {
    this.http.get<any[]>('http://localhost:8080/api/menus/all').subscribe(data => {
      console.log('Received menu data:', data); // Check backend data
      this.totalMenus = data;
      this.days = this.getNext7Days();
      this.initializeSelectedOptions();
      this.updateMenus(); // Make sure this uses the updated totalMenus
    });
  }


  // Get the next 7 days starting from today
  getNext7Days(): Date[] {
    const next7Days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const today = new Date();
      today.setDate(today.getDate() + i);
      next7Days.push(today);
    }
    return next7Days;
  }

  // Update the current menus for the next 7 days
  updateMenus(): void {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dailyMenusCount = 2; // Adjust this count based on your needs
    const startIndex = dayOfWeek * dailyMenusCount;

    // Adjust to ensure you have the correct number of menus
    let currentMenusNoDate = this.totalMenus.slice(startIndex, startIndex + (dailyMenusCount * 7));

    for (let i = 0; i < currentMenusNoDate.length; i += 2) {
      // Determine the date index based on the current index
      const dateIndex = Math.floor(i / 2);

      // Add the first menu with the associated date
      this.currentMenus.push({
        date: this.days[dateIndex],
        ...currentMenusNoDate[i]
      });

      this.currentMenus.push({
        date: this.days[dateIndex],
        ...currentMenusNoDate[i + 1]
      });
    }
    console.log(this.currentMenus);
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  // Capture new values in editable fields
  updateValue(menu: any, field: string, event: any): void {
    const updatedValue = event.target.innerText.trim();
    console.log(`Updating ${field} to: ${updatedValue}`); // Debugging line

    if (field === 'sandwiches') {
      menu[field] = updatedValue ? updatedValue.split(',').map((item: string) => item.trim()) : [];
    } else {
      menu[field] = updatedValue;
    }

  }


  async saveUpdates(): Promise<void> {
    const selectedReservations = this.days.map(day => {
      const dateStr = day.toDateString();
      return {
        date: dateStr,
        ...this.selectedOptions[dateStr]
      };
    });

    console.log("Sending selected reservations:", selectedReservations);
    const userId = Number(localStorage.getItem('id'));
    // Call your API to save the selected reservations
    this.http.post(`http://localhost:8080/api/reservations/save/${userId}`, selectedReservations)
      .subscribe({
        next: async () => {
          await this.fetchReservations(); // Wait for the reservations to update
          this.initializeSelectedOptions(); // Now initialize with the updated reservations
          this.message = "Reservations updated successfully!";
          this.success = true;
        },
        error: async (err) => {
          console.error("Error saving reservations:", err);
          await this.fetchReservations(); // Ensure reservations are fetched again even on error
          this.initializeSelectedOptions();
          this.message = "Error saving reservations!";
          this.success = false;
        }
      });
  }



  // Display day name based on date
  getDay(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: 'long', year: 'numeric'};
    return date.toLocaleDateString('fr-FR', options); // Adjust the locale as needed
  }
}
