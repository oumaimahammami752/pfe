import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  newUser = { firstName: '', lastName: '', email: '', role: '', matricule: '', password: '' };

  constructor(
    public dialogRef: MatDialogRef<AppSideRegisterComponent>, // Corrected here
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // If needed, initialize data here
    if (data?.user) {
      this.newUser = data.user;
    }
  }

  onAdd(): void {
    this.dialogRef.close(this.newUser);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
