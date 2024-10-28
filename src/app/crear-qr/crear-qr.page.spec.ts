import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearQRPage } from './crear-qr.page';

describe('CrearQRPage', () => {
  let component: CrearQRPage;
  let fixture: ComponentFixture<CrearQRPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearQRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
