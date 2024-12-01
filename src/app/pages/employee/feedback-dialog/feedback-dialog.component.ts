import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogContent,
  MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';
import { FeedbackService } from 'src/app/services/feedback.service';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRadioButton,
    MatRadioGroup,
    MatDialogContent,
    MatLabel,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss'],
})
export class FeedbackDialogComponent {
  ratings: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // Generate numbers 1-10
  selectedFeedbackRating: number | null = null; // Updated variable name

  constructor(
    private dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: any }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log('Selected Feedback Rating:', this.selectedFeedbackRating); // Debugging
    if (this.selectedFeedbackRating !== null) {
      this.feedbackService
        .addFeedback(this.selectedFeedbackRating, this.data.reservation.id) // Use feedbackRating instead of feedbackType
        .subscribe({
          next: () => {
            // Display the success message
            this.snackBar.open('Envoyé avec succès!', 'Fermer', {
              duration: 3000, // Show for 3 seconds
            });

            // Close the dialog after showing the message
            setTimeout(() => {
              this.dialogRef.close(this.selectedFeedbackRating);
              console.log('Dialog closed');
            }, 1000); // Close the dialog after the snackbar duration
          },
          error: (err) => {
            console.error('Error submitting feedback:', err);
          },
        });
    } else {
      console.log('No feedback rating selected');
    }
  }

}
