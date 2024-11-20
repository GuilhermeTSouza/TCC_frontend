import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = `${environment.apiUrl}/horario`;

  constructor(private http: HttpClient) {}

  downloadExcel(horarioCursoId: number, dataDeInicio: string) {
    const url = `${this.apiUrl}/${horarioCursoId}/${dataDeInicio}`;
    return this.http.get<any>(url, { responseType: 'json' });
  }
  
}
