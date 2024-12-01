import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for displaying messages

interface LoginResponse {
  email: string;
  id: number;
  // Include other fields if needed
  token: string; // Ensure token is included
}

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    // Add MatSnackBar here

  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form: FormGroup;
  errorMessage: string = ''; // Variable to hold error message

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) { // Inject MatSnackBar
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.valid) {
      const loginData = {
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.http.post<LoginResponse>('http://localhost:8080/rest/auth/C', loginData)
        .pipe(
          catchError(err => {
            console.error('Login failed', err);
            return of(null); // Handle error gracefully
          })
        )
        .subscribe(response => {
          if (response) {
            console.log('Login successful', response);
            localStorage.setItem('id', response.id.toString()); // Store user ID
            localStorage.setItem('authToken', response.token); // Store token

            if (response.email && response.email.includes('admin')) {
              this.router.navigate(['/dashboard']);
            } else if (response.email && response.email.includes('RH')) {
              this.router.navigate(['/prices']); // Navigate to Prices page
            } else {
              this.router.navigate(['/v1/employee']); // Default navigation
            }
          } else {
            // Handle the case where response is null (indicating an error)
            alert( "Invalid credentials, please try again.") // Set an error message if needed
          }
        });
    } else {
      // Handle form validation errors
      alert("Please fill in all required fields with valid data.")

    }
  }
}
