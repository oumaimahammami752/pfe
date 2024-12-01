import { Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";
import { MakeReservationComponent } from "../ui-components/make-reservation/make-reservation.component";
import { ReserviComponent } from "./reservi/reservi.component";
import { ListReservationComponent } from "./reservation-list/reservation-list.component";
import { MatriculeComponent } from "./matricule/matricule.component";
import { MenuTableComponent } from "src/app/pages/employee/menu-table/menu-table.component";


export const EmployeeRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'employee',
                component: EmployeeComponent,
            },
            {
                path: 'reser',
                component: ReserviComponent,
            },
            {
                path:'list',
                component: ListReservationComponent
            },
            {
                path:'matricule',
                component:MatriculeComponent
            },
            {
                path:'menu',
                component: MenuTableComponent
            }
        ],
    }
]