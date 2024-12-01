import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Menu } from '../menu-table/menu-table.component';
import { MatDialogContent } from '@angular/material/dialog';

import { FormControl } from '@angular/forms';

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update-menu-form',
  templateUrl: './update-menu-form.component.html',
  standalone: true,
  imports: [
    MatDialogContent,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule

  ]
})
export class UpdateMenuFormComponent {
  updateMenuForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateMenuFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu
  ) {
    this.updateMenuForm = this.fb.group({
      entree: [data.entree],
      maincourse: [data.main_course],
      garnish: [data.garnish],
      dessert: [data.dessert],
      sandwiches: [data.sandwiches.join(', ')],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const updatedMenu: Menu = {
      ...this.data,
      ...this.updateMenuForm.value,
      sandwiches: this.updateMenuForm.value.sandwiches.split(',').map((s: string) => s.trim()),
    };
    this.dialogRef.close(updatedMenu);
  }
}
