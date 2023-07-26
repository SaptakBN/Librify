import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeReqComponent } from './make-req.component';

describe('MakeReqComponent', () => {
  let component: MakeReqComponent;
  let fixture: ComponentFixture<MakeReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeReqComponent]
    });
    fixture = TestBed.createComponent(MakeReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
