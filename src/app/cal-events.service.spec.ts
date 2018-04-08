import { TestBed, inject } from '@angular/core/testing';

import { CalEventsService } from './cal-events.service';

describe('CalEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalEventsService]
    });
  });

  it('should be created', inject([CalEventsService], (service: CalEventsService) => {
    expect(service).toBeTruthy();
  }));
});
