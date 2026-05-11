import { ApiConfig } from '@/app/core/config/api.config';
import { Ciudad } from '@/app/features/city/models/ciudad';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfig);

  getCities(): Observable<Ciudad[]> {
    const endpoint = this.apiConfig.cities.list();
    return this.http.get<Ciudad[]>(endpoint);
  }

  getCityById(id: number): Observable<Ciudad> {
    const endpoint = this.apiConfig.cities.detail(id);
    return this.http.get<Ciudad>(endpoint);
  }

  createCity(city: Partial<Ciudad>): Observable<Ciudad> {
    const endpoint = this.apiConfig.cities.create();
    return this.http.post<Ciudad>(endpoint, city);
  }

  updateCity(id: number, city: Partial<Ciudad>): Observable<Ciudad> {
    const endpoint = this.apiConfig.cities.update(id);
    return this.http.put<Ciudad>(endpoint, city);
  }

  deleteCity(id: number): Observable<void> {
    const endpoint = this.apiConfig.cities.delete(id);
    return this.http.delete<void>(endpoint);
  }
}
