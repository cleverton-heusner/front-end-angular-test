import { TestBed } from '@angular/core/testing';

import { Loader.Interceptor.TsService } from './loader.interceptor';

describe('Loader.Interceptor.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Loader.Interceptor.TsService = TestBed.get(Loader.Interceptor.TsService);
    expect(service).toBeTruthy();
  });
});
