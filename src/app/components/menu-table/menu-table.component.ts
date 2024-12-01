import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateMenuFormComponent } from '../update-menu-form/update-menu-form.component';
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';
import { FormsModule } from '@angular/forms';
import { format, parseISO } from 'date-fns';
import { groupBy } from 'lodash';


// Define the Menu interface
export interface Menu {
  id: number;
  date: string;
  entree: string;
  main_course: string;
  garnish: string;
  dessert: string;
  sandwiches: string[];
  isHeader?: boolean;
  week?: string;
  day?: string;
}

@Component({
  selector: 'app-menu-table',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    HeaderComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.css']
})
export class MenuTableComponent implements OnInit {
  displayedColumns: string[] = ['week','day','entree', 'platPrincipal', 'garniture', 'dessert', 'sandwiches', 'actions'];
  dataSource: Menu[] = [];
element: any;

  constructor(private http: HttpClient,  public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchMenus();
  }

  fetchMenus(): void {
    this.http.get<Menu[]>('http://localhost:8080/api/menus/all').subscribe(
      data => {
        this.dataSource = data;
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  // transformData(data: any[]): any[] {
  //   const transformedData = data.map(item => ({
  //     date: item.date,
  //     week: this.getWeekNumber(new Date(item.date)),
  //     day: this.getDayName(new Date(item.date)),
  //     entree: item.entree,
  //     platPrincipal: item.platPrincipal,
  //     garniture: item.garniture,
  //     dessert: item.dessert,
  //     sandwiches: item.sandwiches || []
  //   }));
  //   // Group data by week
  //   const groupedByWeek = this.groupByWeek(transformedData);

  //   // Flatten grouped data into a single array for the table
  //   const flattenedData: any[] = [];
  //   Object.keys(groupedByWeek).forEach(week => {
  //     flattenedData.push({ week, day: '', entree: '', platPrincipal: '', garniture: '', dessert: '', sandwiches: [], isHeader: true });
  //     groupedByWeek[week].forEach((item: any) => flattenedData.push(item));
  //   });

  //   return flattenedData;
  // }

  deleteMenu(id: number): void {
    const url = `http://localhost:8080/api/menus/delete/${id}`;
    this.http.delete(url).subscribe(
      () => {
        console.log('Menu deleted successfully');
        // Filter out the deleted item from the dataSource
        this.dataSource = this.dataSource.filter(menu => menu.id !== id);
        // Trigger change detection to update the UI
        this.dataSource = [...this.dataSource]; // Reassign to trigger change detection
      },
      error => {
        console.error('There was an error deleting the menu!', error);
      }
    );
  }

  openUpdateDialog(menu: Menu): void {
    const dialogRef = this.dialog.open(UpdateMenuFormComponent, {
      width: '300px',
      data: menu,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMenu(result);
      }
    });
  }

  updateMenu(menu: Menu): void {
    this.http.put<Menu>(`http://localhost:8080/api/menus/update/${menu.id}`, menu).subscribe(updatedMenu => {
      const index = this.dataSource.findIndex(m => m.id === updatedMenu.id);
      this.dataSource[index] = updatedMenu;
    });
  }

  getDayName(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, 'EEEE'); // 'EEEE' gives the full day name (e.g., 'Monday')
  }

  getWeekNumber(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + 1) / 7);
  }



  groupByDataByWeek(data: any[]): { [key: string]: any[] } {
    const groupedByWeek: { [key: string]: any[] } = {}; // This is an object, not an array
  
    data.forEach(item => {
      const date = new Date(item.date);
      const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1)); // Monday as start of week
      const weekKey = `${startOfWeek.getFullYear()}-W${Math.ceil((date.getDate() + 1 - startOfWeek.getDay()) / 7)}`;
  
      // Ensure that the key exists in the object, then push the item into the array
      if (!groupedByWeek[weekKey]) {
        groupedByWeek[weekKey] = []; // Initialize an array for the week if it doesn't exist
      }
      groupedByWeek[weekKey].push(item);
    });
  
    return groupedByWeek; // This returns an object where each key is a week, and the value is an array of items for that week
  }
  

  flattenDataForDisplay(groupedByWeek: { [key: string]: Menu[] }): Menu[] {
    const flattenedData: Menu[] = [];

    Object.keys(groupedByWeek).forEach(week => {
      // Add a header row for each week
      flattenedData.push({
        id: -1, // Use a special id for header rows
        date: '',
        week,
        day: '',
        entree: '',
        main_course: '',
        garnish: '',
        dessert: '',
        sandwiches: [],
        isHeader: true
      });

      // Add each item for the week
      groupedByWeek[week].forEach(item => {
        flattenedData.push({
          ...item,
          week
        });
      });
    });

    return flattenedData;
  }
}
