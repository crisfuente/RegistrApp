import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuDocentePage } from './menu-docente.page';

describe('MenuDocentePage', () => {
  let component: MenuDocentePage;
  let fixture: ComponentFixture<MenuDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
