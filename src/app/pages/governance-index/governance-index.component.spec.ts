import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernanceIndexComponent } from './governance-index.component';

describe('GovernanceIndexComponent', () => {
  let component: GovernanceIndexComponent;
  let fixture: ComponentFixture<GovernanceIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernanceIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernanceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
