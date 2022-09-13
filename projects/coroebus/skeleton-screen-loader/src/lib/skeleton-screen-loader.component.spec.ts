import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonScreenLoaderComponent } from './skeleton-screen-loader.component';

describe('SkeletonScreenLoaderComponent', () => {
  let component: SkeletonScreenLoaderComponent;
  let fixture: ComponentFixture<SkeletonScreenLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonScreenLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonScreenLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
