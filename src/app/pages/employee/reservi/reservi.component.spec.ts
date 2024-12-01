import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserviComponent } from './reservi.component';

describe('ReserviComponent', () => {
  let component: ReserviComponent;
  let fixture: ComponentFixture<ReserviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
