import { TestBed } from '@angular/core/testing';

import { ChallengeDetails.ResolverService } from './challenge-details.resolver.service';

describe('ChallengeDetails.ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChallengeDetails.ResolverService = TestBed.get(ChallengeDetails.ResolverService);
    expect(service).toBeTruthy();
  });
});
