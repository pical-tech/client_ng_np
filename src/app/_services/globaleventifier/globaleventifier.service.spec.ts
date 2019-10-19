import { TestBed } from '@angular/core/testing';

import { GlobaleventifierService } from './globaleventifier.service';

describe('GlobaleventifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobaleventifierService = TestBed.get(GlobaleventifierService);
    expect(service).toBeTruthy();
  });
});
