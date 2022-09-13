import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningAcademyComponent } from './learning-academy.component';

describe('LearningAcademyComponent', () => {
  let component: LearningAcademyComponent;
  let fixture: ComponentFixture<LearningAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningAcademyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
