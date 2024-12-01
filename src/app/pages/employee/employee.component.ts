import { Component } from '@angular/core';
import { TooltipComponent } from '@angular/material/tooltip';

import { HeaderComponent } from 'src/app/layouts/full/header/header.component';
import { AppTooltipsComponent } from '../ui-components/tooltips/tooltips.component';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { CollectionComponent } from 'src/app/components/collection/collection.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { PricesComponent } from 'src/app/components/prices/prices.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [HeaderComponent,
    
    AppTooltipsComponent, CarouselComponent,CollectionComponent,CardComponent,PricesComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
