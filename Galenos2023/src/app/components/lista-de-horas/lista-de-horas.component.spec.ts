import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeHorasComponent } from './lista-de-horas.component';

describe('ListaDeHorasComponent', () => {
  let component: ListaDeHorasComponent;
  let fixture: ComponentFixture<ListaDeHorasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDeHorasComponent]
    });
    fixture = TestBed.createComponent(ListaDeHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
