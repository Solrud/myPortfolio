import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerBodyLizComponent } from './inner-body-liz.component';

describe('InnerBodyLizComponent', () => {
  let component: InnerBodyLizComponent;
  let fixture: ComponentFixture<InnerBodyLizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerBodyLizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerBodyLizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
