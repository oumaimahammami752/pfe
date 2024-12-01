import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardNameGuard } from './guard-name.guard';

describe('guardNameGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardNameGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
