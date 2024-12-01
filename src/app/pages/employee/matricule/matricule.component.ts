import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../../layouts/full/header/header.component";
import { Header2Component } from 'src/app/layouts/full/header2/header2.component';

@Component({
  selector: 'app-matricule',
  standalone: true,
  imports: [RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule, HeaderComponent,
    Header2Component],
  templateUrl: './matricule.component.html',
  styleUrl: './matricule.component.css'
})
export class MatriculeComponent {
  form: FormGroup;
  showWelcome: boolean = false;
  showImprimerButton: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      matricule: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const matricule = this.form.value.matricule;

      // Call the API
      this.http.get(`http://localhost:8080/api/reservations/checkReservation?matricule=${matricule}`,{ responseType: 'text' }).subscribe(
        (response: string) => {
          if (response.trim() === 'Welcome!') {
            this.showWelcome = true;
            this.showImprimerButton = true;
            this.snackBar.open('Welcome!', 'Close', {
              duration: 3000,
            });

            this.generateAndDownloadPDF(matricule);

          } else {
            this.showWelcome = false;
            this.showImprimerButton = false;
            this.snackBar.open('Sorry, you don’t have a reservation today.', 'Close', {
              duration: 3000,
            });
          }
        },
        (error) => {
          this.snackBar.open('An error occurred. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }


  generateAndDownloadPDF(matricule: string) {
    this.http.get(`http://localhost:8080/api/reservations/generate-pdf?matricule=${matricule}`, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'reservation.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        this.snackBar.open('Failed to generate PDF. Please try again.', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  
}