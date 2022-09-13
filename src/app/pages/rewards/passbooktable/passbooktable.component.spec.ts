import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassbooktableComponent } from './passbooktable.component';

describe('PassbooktableComponent', () => {
  let component: PassbooktableComponent;
  let fixture: ComponentFixture<PassbooktableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassbooktableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassbooktableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
