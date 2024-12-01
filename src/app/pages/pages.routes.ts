import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { StatisticComponent } from '../components/statistic/statistic.component';


export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },

  {
    path: 'statistic',
    component: StatisticComponent, // Add the route for the StatisticComponent
    data: {
      title: 'Add Menu',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Add Menu' },
      ],
    },
  }
]
