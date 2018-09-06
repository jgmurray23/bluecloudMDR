import { TestBed, inject } from '@angular/core/testing';

import { LoginxferService } from './loginxfer.service';

describe('LoginxferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginxferService]
    });
  });

  it('should be created', inject([LoginxferService], (service: LoginxferService) => {
    expect(service).toBeTruthy();
  }));
});
