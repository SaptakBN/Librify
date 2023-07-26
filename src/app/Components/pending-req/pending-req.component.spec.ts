import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReqComponent } from './pending-req.component';

describe('PendingReqComponent', () => {
  let component: PendingReqComponent;
  let fixture: ComponentFixture<PendingReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingReqComponent]
    });
    fixture = TestBed.createComponent(PendingReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
