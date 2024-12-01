import { Routes } from "@angular/router";
import { MenuTableComponent } from "./menu-table.component";

export const MenuTableRoutes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'menu',
          component: MenuTableComponent,
        },
      ],
    },
  ];
  