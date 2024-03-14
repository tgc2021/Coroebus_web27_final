import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlayzoneComponent } from './new-playzone.component';

describe('NewPlayzoneComponent', () => {
  let component: NewPlayzoneComponent;
  let fixture: ComponentFixture<NewPlayzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlayzoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPlayzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
