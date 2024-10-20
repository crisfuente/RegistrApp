import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaClavePage } from './nueva-clave.page';

describe('NuevaClavePage', () => {
  let component: NuevaClavePage;
  let fixture: ComponentFixture<NuevaClavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
