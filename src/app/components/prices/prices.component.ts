import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PricesService } from '../../prices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import {MatAnchor, MatButton, MatFabButton, MatMiniFabButton} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import { Location } from '@angular/common';
import { AppSideRegisterComponent } from '../../pages/authentication/side-register/side-register.component';
import { AppDailyActivitiesComponent } from '../daily-activities/daily-activities.component';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
  imports: [
    MatCard,
    MatCardTitle,
    MatTable,
    MatCardContent,
    MatButton,
    MatFormField,
    MatInput,
    MatBadge,
    MatMenu,
    MatMenuTrigger,
    MatToolbar,
    FormsModule,
    MatMiniFabButton,
    MatFabButton,
    MatAnchor,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatTable,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    RouterLink,
    MatIcon,
  ],
  standalone: true,
})
export class PricesComponent implements OnInit {
  displayedColumns: string[] = [
    'username',
    'lastname',
    'email',
    'role',
    'matricule',
    'password',
    'actions',
  ];
  dataSource = new MatTableDataSource([]);
  newUser = { firstName: '', lastName: '', email: '', role: '', password: '' };

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(
    private pricesService: PricesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  goBack(): void {
    this.location.back();
  }

  logout(): void {
    // Clear the authentication token and session data
    localStorage.removeItem('authToken');
    sessionStorage.clear();

    // Prevent back navigation
    window.history.pushState(null, '', location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', location.href);
    };

    // Redirect to login page and replace current URL
    this.router.navigate(['/authentication/login'], { replaceUrl: true });
  }


  fetchUsers(): void {
    this.pricesService.getAllUsers().subscribe(
      (response: any) => {
        this.dataSource.data = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AppSideRegisterComponent, {
      width: '300px',
      data: { user: this.newUser },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addUser(result);
      }
    });
  }

  addUser(newUser: any): void {
    this.pricesService.registerUser(newUser).subscribe(
      () => {
        this.snackBar.open('Utilisateur ajouté avec succès!', 'Fermer', {
          duration: 3000,
        });
        this.fetchUsers();
      },
      (error) => {
        console.error('Error adding user:', error);
        this.snackBar.open(
          'Erreur lors de l\'ajout de l\'utilisateur!',
          'Fermer',
          { duration: 3000 }
        );
      }
    );
  }

  openEditUserDialog(user: any): void {
    const dialogRef = this.dialog.open(AppDailyActivitiesComponent, {
      width: '300px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editUser(user.id, result);
      }
    });
  }

  editUser(userId: number, updatedUser: any): void {
    this.pricesService.editUser(userId, updatedUser).subscribe(
      () => {
        this.snackBar.open('Utilisateur modifié avec succès!', 'Fermer', {
          duration: 3000,
        });
        this.fetchUsers();
      },
      (error) => {
        console.error('Error editing user:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    if (!userId) return;

    this.pricesService.deleteUser(userId).subscribe(
      () => {
        this.snackBar.open('User deleted successfully!', 'Close', {
          duration: 3000,
        });
        this.fetchUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.snackBar.open('Error deleting user!', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
