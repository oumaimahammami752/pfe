import { Component } from '@angular/core';
import { MakeReservationComponent } from "../../ui-components/make-reservation/make-reservation.component";
import { HeaderComponent } from 'src/app/layouts/full/header/header.component';

@Component({
  selector: 'app-reservi',
  standalone: true,
  imports: [MakeReservationComponent,HeaderComponent],
  templateUrl: './reservi.component.html',
  styleUrl: './reservi.component.scss'
})
export class ReserviComponent {

}
