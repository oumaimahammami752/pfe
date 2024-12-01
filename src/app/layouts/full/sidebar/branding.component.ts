import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
        <img
          src="./assets/images/logos/lunch.png"
          class="align-middle m-2"
          alt="logo"
          style="width: 100px; height: auto;"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
