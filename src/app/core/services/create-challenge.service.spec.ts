import { TestBed } from '@angular/core/testing';

import { CreateChallengeService } from './create-challenge.service';

describe('CreateChallengeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateChallengeService = TestBed.get(CreateChallengeService);
    expect(service).toBeTruthy();
  });
});
