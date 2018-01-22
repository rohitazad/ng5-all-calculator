import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleInterestComponent } from './simple-interest.component';

describe('SimpleInterestComponent', () => {
  let component: SimpleInterestComponent;
  let fixture: ComponentFixture<SimpleInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
