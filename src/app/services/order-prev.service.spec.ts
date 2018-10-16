import { TestBed, inject } from '@angular/core/testing';

import { OrderPrevService } from './order-prev.service';

describe('OrderPrevService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderPrevService]
    });
  });

  it('should be created', inject([OrderPrevService], (service: OrderPrevService) => {
    expect(service).toBeTruthy();
  }));
});
