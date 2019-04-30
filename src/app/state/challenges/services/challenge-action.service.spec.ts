import { TestBed } from '@angular/core/testing';

import { ChallengeActionService } from './challenge-action.service';

describe('ChallengeActionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChallengeActionService = TestBed.get(ChallengeActionService);
    expect(service).toBeTruthy();
  });
});
