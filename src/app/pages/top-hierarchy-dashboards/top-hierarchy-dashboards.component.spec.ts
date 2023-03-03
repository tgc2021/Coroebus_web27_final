import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopHierarchyDashboardsComponent } from './top-hierarchy-dashboards.component';

describe('TopHierarchyDashboardsComponent', () => {
  let component: TopHierarchyDashboardsComponent;
  let fixture: ComponentFixture<TopHierarchyDashboardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopHierarchyDashboardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopHierarchyDashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
