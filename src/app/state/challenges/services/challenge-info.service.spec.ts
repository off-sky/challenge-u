import { TestBed } from '@angular/core/testing';

import { ChallengeInfoService } from './challenge-info.service';

describe('ChallengeInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChallengeInfoService = TestBed.get(ChallengeInfoService);
    expect(service).toBeTruthy();
  });
});
