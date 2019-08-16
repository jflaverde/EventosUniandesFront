import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoUpdateComponent } from './evento-update.component';

describe('EventoUpdateComponent', () => {
  let component: EventoUpdateComponent;
  let fixture: ComponentFixture<EventoUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventoUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
