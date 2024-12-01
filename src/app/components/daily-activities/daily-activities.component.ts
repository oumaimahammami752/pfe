import {Component, Inject} from '@angular/core';
import { MaterialModule } from '../../material.module';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

@Component({
  selector: 'app-daily-activities',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './daily-activities.component.html',
})
export class AppDailyActivitiesComponent {
  constructor(
    public dialogRef: MatDialogRef<AppDailyActivitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    // Logic for saving daily activities
    this.dialogRef.close(this.data);
  }
}
