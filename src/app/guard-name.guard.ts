import { CanActivateFn } from '@angular/router';

export const guardNameGuard: CanActivateFn = (route, state) => {
  return true;
};
