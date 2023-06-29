import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMapsComponent } from './mobile-maps.component';

describe('MobileMapsComponent', () => {
  let component: MobileMapsComponent;
  let fixture: ComponentFixture<MobileMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
