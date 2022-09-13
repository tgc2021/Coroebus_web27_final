import { TestBed } from '@angular/core/testing';

import { SkeletonScreenLoaderService } from './skeleton-screen-loader.service';

describe('SkeletonScreenLoaderService', () => {
  let service: SkeletonScreenLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkeletonScreenLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
