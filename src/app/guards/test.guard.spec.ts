import { TestBed, async, inject } from '@angular/core/testing';

import { TestGuard } from './test.guard';

describe('TestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestGuard]
    });
  });

  it('should ...', inject([TestGuard], (guard: TestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
