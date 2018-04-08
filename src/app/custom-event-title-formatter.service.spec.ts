import { TestBed, inject } from '@angular/core/testing';

import { CustomEventTitleFormatterService } from './custom-event-title-formatter.service';

describe('CustomEventTitleFormatterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomEventTitleFormatterService]
    });
  });

  it('should be created', inject([CustomEventTitleFormatterService], (service: CustomEventTitleFormatterService) => {
    expect(service).toBeTruthy();
  }));
});
