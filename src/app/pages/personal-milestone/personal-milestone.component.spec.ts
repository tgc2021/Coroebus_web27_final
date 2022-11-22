import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMilestoneComponent } from './personal-milestone.component';

describe('PersonalMilestoneComponent', () => {
  let component: PersonalMilestoneComponent;
  let fixture: ComponentFixture<PersonalMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalMilestoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
