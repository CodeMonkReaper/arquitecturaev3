import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css'],
})
export class ReservarComponent implements OnInit {
  reservaForm: FormGroup = this.formBuilder.group({
    medico: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    especialidad: ['', Validators.required],
    motivoconsulta: ['', Validators.required],
  });
  feriados: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.authService.getFeriados().subscribe(
      (response: any) => {
        if (response && response.status === 'success' && response.data) {
          this.feriados = response.data;
        } else {
          console.error(
            'Respuesta inválida del servicio de feriados:',
            response
          );
        }
      },
      (error: any) => {
        console.error('Error al obtener días feriados', error);
      }
    );
  }

  onSubmit() {
    if (this.reservaForm.valid) {
      const reservaData = this.reservaForm.value;
      reservaData.hora += ':00';
      reservaData.motivoConsulta = reservaData.motivoconsulta;

      if (this.isFechaFeriado(reservaData.fecha)) {
        alert('No se pueden hacer reservas en días feriados.');
        return;
      }

      this.authService.agendarReserva(reservaData).subscribe(
        (type: any) => {
          alert('Reserva guardada exitosamente');
        },
        (error: any) => {
          alert('error');
          console.error('Error al realizar la reserva', error);
          if (error && error.error && error.error.errors) {
            // Imprime los detalles específicos del error
            console.error('Detalles del error:', error.error.errors);
          }
        }
      );
    }
  }

  isFechaFeriado(fecha: string): boolean {
    return (
      Array.isArray(this.feriados) &&
      this.feriados.some((feriado) => feriado.date === fecha)
    );
  }
}
