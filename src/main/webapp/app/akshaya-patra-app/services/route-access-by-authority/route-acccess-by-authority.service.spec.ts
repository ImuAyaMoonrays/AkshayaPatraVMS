import { TestBed } from '@angular/core/testing';

import { RouteAcccessByRequiredAuthoritiesService } from './route-acccess-by-required-authorities.service';

describe('RouteAcccessByAuthorityService', () => {
  let service: RouteAcccessByRequiredAuthoritiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteAcccessByRequiredAuthoritiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
