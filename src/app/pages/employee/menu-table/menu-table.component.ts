import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {HeaderComponent} from 'src/app/layouts/full/header/header.component';

@Component({
  selector: 'app-menu-table',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.css']
})
export class MenuTableComponent implements OnInit, OnDestroy {
  currentMenus: any[] = [];

  selectedOptions: { [date: string]: { [key: string]: string | null } } = {};
  totalMenus: any[] = [];
  days: Date[] = [];
  message: string | null = null;
  success: boolean = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  ngOnDestroy(): void {
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

  // Load all menus and set up the days for the table
  loadMenus(): void {
    this.http.get<any[]>('http://localhost:8080/api/menus/all').subscribe(data => {
      console.log('Received menu data:', data); // Check backend data
      this.totalMenus = data;
      this.days = this.getNext7Days();
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


  // Save updates for all menus in the table
  saveUpdates(): void {
    const updateRequests = this.currentMenus.map(menu => {
      console.log('Sending update for menu:', menu); // Debugging statement
      return this.http.put(`http://localhost:8080/api/menus/update/${menu.id}`, menu, {
        headers: {
          'Content-Type': 'application/json',
          // Uncomment and set this if you are using JWT or other authentication
          // 'Authorization': `Bearer ${your_token_here}`
        }
      }).toPromise();
    });

    Promise.all(updateRequests)
      .then(() => {
        this.success = true;
        this.message = 'Menus updated successfully!';
        setTimeout(() => (this.message = null), 5000); // Clear the message after 5 seconds
      })
      .catch(error => {
        this.success = false;
        this.message = 'Menus updated successfully!';
      });
  }


  // Display day name based on date
  getDay(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {day: '2-digit', month: 'long', year: 'numeric'};
    return date.toLocaleDateString('fr-FR', options); // Adjust the locale as needed
  }
}
