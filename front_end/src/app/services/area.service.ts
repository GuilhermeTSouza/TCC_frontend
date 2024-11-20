import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Area } from '../models/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = `${environment.apiUrl}/area`;

  constructor(private http: HttpClient) {}

  getAllAreas() {
    return this.http.get<Area[]>(this.apiUrl);
  }
}
