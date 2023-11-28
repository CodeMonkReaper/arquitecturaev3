import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ApiResponse } from 'src/app/auth.service';

@Component({
  selector: 'app-lista-de-horas',
  templateUrl: './lista-de-horas.component.html',
  styleUrls: ['./lista-de-horas.component.css'],
})
export class ListaDeHorasComponent implements OnInit {
  horas: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarHoras();
    console.log('ID de reserva a borrar:', this.horas);
  }

  cargarHoras() {
    this.authService.getHoras().subscribe(
      (response: any) => {
        console.log('Respuesta del servicio:', response);

        // Verificar que response tenga las propiedades correctas
        if (this.isValidResponse(response)) {
          this.horas = Array.isArray(response.data) ? response.data : [];
        } else {
          console.error('Respuesta del servicio no válida:', response);
          this.horas = [];
        }
      },
      (error) => {
        console.error('Error al obtener horas', error);
      }
    );
  }

  private isValidResponse(response: any): response is ApiResponse<any[]> {
    return (
      response && response.status === 'success' && Array.isArray(response.data)
    );
  }

  borrarHora(id: number): void {
    this.authService.borrarHora(id).subscribe(
      () => {
        console.log('Hora borrada exitosamente');
      },
      (error) => {
        console.error('Error al borrar hora', error);
      }
    );
  }
}
