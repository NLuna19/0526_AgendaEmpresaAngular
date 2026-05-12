import { ApiConfig } from '@/app/core/config/api.config';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfig);

  getPeople(): Observable<Persona[]> {
    const endpoint = this.apiConfig.people.list();
    return this.http.get<Persona[]>(endpoint);
  }

  getPersonById(id: number): Observable<Persona> {
    const endpoint = this.apiConfig.people.detail(id);
    return this.http.get<Persona>(endpoint);
  }

  createPerson(person: Partial<Persona>): Observable<Persona> {
    const endpoint = this.apiConfig.people.create();
    return this.http.post<Persona>(endpoint, person);
  }

  updatePerson(id: number, person: Partial<Persona>): Observable<Persona> {
    const endpoint = this.apiConfig.people.update(id);
    return this.http.put<Persona>(endpoint, person);
  }

  deletePerson(id: number): Observable<void> {
    const endpoint = this.apiConfig.people.delete(id);
    return this.http.delete<void>(endpoint);
  }

  searchPersonByCities(name: string, lastName: string, cities: string[]): Observable<Persona[]> {
    const endpoint = this.apiConfig.search.peopleByCities();
    return this.http.get<Persona[]>(endpoint, {
      params: {
        nombre: name,
        apellido: lastName,
        ciudades: cities,
      },
    });
  }
}
