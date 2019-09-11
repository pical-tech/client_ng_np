import { TestBed } from '@angular/core/testing';

import { CeremonyService } from './ceremony.service';

describe('CeremonyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CeremonyService = TestBed.get(CeremonyService);
    expect(service).toBeTruthy();
  });
});
