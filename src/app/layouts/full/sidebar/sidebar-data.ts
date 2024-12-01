// import { NavItem } from './nav-item/nav-item';

// export const navItems: NavItem[] = [
//   {
//     navCap: 'Home',
//   },
//   {
//     displayName: 'Dashboard',
//     iconName: 'solar:widget-add-line-duotone',
//     route: '/dashboard',
//   },
//   {
//     navCap: 'Menu',
//     divider: true
//   },
//   {
//     displayName: 'View Reservations',
//     iconName: 'solar:calendar-line-duotone',
//     route: '/ui-components/badge',
//   },
//   {
//     displayName: 'Chips',
//     iconName: 'solar:danger-circle-line-duotone',
//     route: '/ui-components/chips',
//   },
//   {
//     displayName: 'Lists',
//     iconName: 'solar:bookmark-square-minimalistic-line-duotone',
//     route: '/ui-components/lists',
//   },
//   {
//     displayName: 'Menu',
//     iconName: 'solar:file-text-line-duotone',
//     route: '/ui-components/menu',
//   },
//   {
//     displayName: 'Tooltips',
//     iconName: 'solar:text-field-focus-line-duotone',
//     route: '/ui-components/tooltips',
//   },
//   {
//     displayName: 'Forms',
//     iconName: 'solar:file-text-line-duotone',
//     route: '/ui-components/forms',
//   },
//   {
//     displayName: 'Tables',
//     iconName: 'solar:tablet-line-duotone',
//     route: '/ui-components/tables',
//   },
//   {
//     navCap: 'Reservation',
//     divider: true
//   },
//   {
//     displayName: 'Login',
//     iconName: 'solar:login-3-line-duotone',
//     route: '/authentication/login',
//   },
//   {
//     displayName: 'Register',
//     iconName: 'solar:user-plus-rounded-line-duotone',
//     route: '/authentication/register',
//   },
//   {
//     navCap: 'Extra',
//     divider: true
//   },
//   {
//     displayName: 'Icons',
//     iconName: 'solar:sticker-smile-circle-2-line-duotone',
//     route: '/extra/icons',
//   },
//   {
//     displayName: 'Sample Page',
//     iconName: 'solar:planet-3-line-duotone',
//     route: '/extra/sample-page',
//   },
// ];
import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Tableau de Bord',
    iconName: 'solar:dashboard-line-duotone',
    route: '/dashboard',
  },
  // {
  //       displayName: 'Lists',
  //       iconName: 'solar:bookmark-square-minimalistic-line-duotone',
  //       route: '/ui-components/lists',
  //     },
  {
    displayName: 'Menus',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'Gestion des Menus',
    divider: true
  },
  {
    displayName: 'Statistics',
    iconName: 'solar:add-circle-broken',
    route: '/dashboard/statistic',
  },
  {
    displayName: 'ajouter une colonne',
    iconName: 'solar:add-circle-broken',
    route: '/ui-components/add-menu',
  },
  // {
  //   displayName: 'Mettre à Jour un Menu',
  //   iconName: 'solar:server-square-update-outline',
  //   route: '/menus/update',
  // },
  // {
  //   displayName: 'Supprimer un Menu',
  //   iconName: 'solar:trash-bin-trash-bold',
  //   route: '/menus/delete',
  // },
  {
    navCap: 'Gestion des Réservations',
    divider: true
  },
  {
    displayName: 'Voir les Réservations',
    iconName: 'solar:calendar-date-bold',
    route: '/ui-components/reservations',
  },
  // {
  //   displayName: 'Ajouter une Réservation',
  //   iconName: 'solar:add-circle-bold',
  //   route: '/ui-components/make-reservation',
  // },


  // {
  //   displayName: 'Voir les Utilisateurs',
  //   iconName: 'solar:user-line-duotone',
  //   route: '/users/view',
  // },
  // {
  //   displayName: 'Ajouter un Utilisateur',
  //   iconName: 'solar:user-plus-line-duotone',
  //   route: '/users/add',
  // },
  // {
  //   displayName: 'Mettre à Jour un Utilisateur',
  //   iconName: 'solar:smartphone-update-bold',
  //   route: '/users/update',
  // },
  // {
  //   displayName: 'Supprimer un Utilisateur',
  //   iconName: 'solar:user-cross-bold',
  //   route: '/users/delete',
  // },
  // {
  //   navCap: 'Paramètres',
  //   divider: true
  // },
  // {
  //   displayName: 'Paramètres du Profil',
  //   iconName: 'solar:settings-line-duotone',
  //   route: '/settings/profile',
  // },
  // {
  //   displayName: 'Paramètres du Système',
  //   iconName: 'solar:system-line-duotone',
  //   route: '/settings/system',
  // },
];
