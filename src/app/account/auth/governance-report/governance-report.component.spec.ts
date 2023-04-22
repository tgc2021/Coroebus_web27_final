import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernanceReportComponent } from './governance-report.component';

describe('GovernanceReportComponent', () => {
  let component: GovernanceReportComponent;
  let fixture: ComponentFixture<GovernanceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernanceReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
