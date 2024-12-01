import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculeComponent } from './matricule.component';

describe('MatriculeComponent', () => {
  let component: MatriculeComponent;
  let fixture: ComponentFixture<MatriculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatriculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
