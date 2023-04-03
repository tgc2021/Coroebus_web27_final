import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessHeadMapComponent } from './business-head-map.component';

describe('BusinessHeadMapComponent', () => {
  let component: BusinessHeadMapComponent;
  let fixture: ComponentFixture<BusinessHeadMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessHeadMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessHeadMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
