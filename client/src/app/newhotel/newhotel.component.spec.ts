import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewhotelComponent } from './newhotel.component';

describe('NewhotelComponent', () => {
  let component: NewhotelComponent;
  let fixture: ComponentFixture<NewhotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewhotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewhotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
