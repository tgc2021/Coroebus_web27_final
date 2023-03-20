import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionVideoComponent } from './introduction-video.component';

describe('IntroductionVideoComponent', () => {
  let component: IntroductionVideoComponent;
  let fixture: ComponentFixture<IntroductionVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroductionVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroductionVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
