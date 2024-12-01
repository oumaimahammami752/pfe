import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatTable} from "@angular/material/table";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  standalone: true,
  imports: [
    MatTable,
    ReactiveFormsModule,
    MatCardTitle,
    MatCard,
    MatLabel,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    NgForOf
  ],
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  // Form to input the name of the new column (e.g., sandwich, dessert)
  newColumnForm: FormGroup;

  // Holds the table data dynamically
  menuColumns: string[] = ['entree', 'mainCourse', 'garnish', 'dessert'];  // Existing columns
  tableData: any[] = [];  // Data for each column

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.newColumnForm = this.fb.group({
      columnName: ['']  // Form field for column name
    });
  }

  ngOnInit(): void {
    // Load the initial menu data from backend (optional, if needed)
  }

  // Add a new column
  Ajouter() {
    if (this.newColumnForm.valid) {
      const newColumn = this.newColumnForm.value.columnName;
      if (newColumn && !this.menuColumns.includes(newColumn)) {
        this.menuColumns.push(newColumn);  // Add new column to the UI

        // Create a new row with an empty array for the new column
        this.tableData.forEach(row => row[newColumn] = '');  // Initialize new column data in all existing rows
        this.tableData.push({ [newColumn]: '' });  // Add a new row with empty data for the new column

        // Send this new column name to the backend to update the database
        this.http.post('http://localhost:8080/api/menus/add-row', { columnName: newColumn })
          .subscribe(response => {
            console.log('Column added successfully:', response);
          }, error => {
            console.error('Error adding column', error);
          });

        // Reset the form input
        this.newColumnForm.reset();
      }
    } else {
      alert('Please enter a column name');
    }
  }

}
