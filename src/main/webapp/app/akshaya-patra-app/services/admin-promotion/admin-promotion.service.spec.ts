import { TestBed } from '@angular/core/testing';

import { AdminPromotionService } from './admin-promotion.service';

describe('AdminPromotionService', () => {
  let service: AdminPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
