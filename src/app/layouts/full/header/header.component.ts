import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';  // Import du service Location
import { AuthService } from 'src/app/auth.service';
import {MaterialModule} from "../../../material.module";  // Assuming you have AuthService

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, MaterialModule, MatButtonModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private router: Router, private location: Location, private authService: AuthService) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  // Method to go back in browser history
  goBack(): void {
    this.location.back();
  }

  // Logout method
  logout(): void {
    // Clear authentication token and session
    this.authService.logout();

    // Clear history so that pressing back doesn't navigate back to the app
    history.replaceState(null, '', '/authentication/login');

    // Navigate to login page
    this.router.navigate(['/authentication/login']);
  }
}
