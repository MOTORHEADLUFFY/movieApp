import { TestBed } from '@angular/core/testing';

import { UserSelectedService } from './user-selected.service';

describe('UserSelectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserSelectedService = TestBed.get(UserSelectedService);
    expect(service).toBeTruthy();
  });
});
