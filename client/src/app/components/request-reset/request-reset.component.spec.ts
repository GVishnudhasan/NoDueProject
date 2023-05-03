import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestresetComponent } from './request-reset.component';

describe('RequestresetComponent', () => {
  let component: RequestresetComponent;
  let fixture: ComponentFixture<RequestresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestresetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
