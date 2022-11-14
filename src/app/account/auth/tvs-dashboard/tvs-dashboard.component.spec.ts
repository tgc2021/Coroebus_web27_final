import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvsDashboardComponent } from './tvs-dashboard.component';

describe('TvsDashboardComponent', () => {
  let component: TvsDashboardComponent;
  let fixture: ComponentFixture<TvsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvsDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
