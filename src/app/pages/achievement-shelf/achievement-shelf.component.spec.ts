import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementShelfComponent } from './achievement-shelf.component';

describe('AchievementShelfComponent', () => {
  let component: AchievementShelfComponent;
  let fixture: ComponentFixture<AchievementShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementShelfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
