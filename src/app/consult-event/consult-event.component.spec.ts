import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultEventComponent } from './consult-event.component';

describe('ConsultEventComponent', () => {
  let component: ConsultEventComponent;
  let fixture: ComponentFixture<ConsultEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
