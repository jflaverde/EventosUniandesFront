import { TestBed, async, inject } from '@angular/core/testing';

import { NoAutenticadoGuard } from './no-autenticado.guard';

describe('NoAutenticadoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAutenticadoGuard]
    });
  });

  it('should ...', inject([NoAutenticadoGuard], (guard: NoAutenticadoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
