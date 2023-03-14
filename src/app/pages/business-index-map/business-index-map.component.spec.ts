import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessIndexMapComponent } from './business-index-map.component';

describe('BusinessIndexMapComponent', () => {
  let component: BusinessIndexMapComponent;
  let fixture: ComponentFixture<BusinessIndexMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessIndexMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessIndexMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
