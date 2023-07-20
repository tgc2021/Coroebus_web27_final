import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRewardPageComponent } from './new-reward-page.component';

describe('NewRewardPageComponent', () => {
  let component: NewRewardPageComponent;
  let fixture: ComponentFixture<NewRewardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRewardPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRewardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
