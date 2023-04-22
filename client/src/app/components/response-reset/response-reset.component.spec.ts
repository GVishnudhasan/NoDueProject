import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseresetComponent } from './response-reset.component';

describe('ResponseresetComponent', () => {
  let component: ResponseresetComponent;
  let fixture: ComponentFixture<ResponseresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseresetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
