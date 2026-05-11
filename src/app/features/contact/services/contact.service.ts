import { ApiConfig } from '@/app/core/config/api.config';
import { Contacto } from '@/app/features/contact/models/contacto';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfig);

  getContacts(): Observable<Contacto[]> {
    const endpoint = this.apiConfig.contacts.list();
    return this.http.get<Contacto[]>(endpoint);
  }

  getContactById(idEmpresa: number, idPersona: number): Observable<Contacto> {
    const endpoint = this.apiConfig.contacts.detail(`${idEmpresa}/${idPersona}`);
    return this.http.get<Contacto>(endpoint);
  }

  createContact(contact: Partial<Contacto>): Observable<Contacto> {
    const endpoint = this.apiConfig.contacts.create();
    return this.http.post<Contacto>(endpoint, contact);
  }

  updateContact(
    idEmpresa: number,
    idPersona: number,
    contact: Partial<Contacto>
  ): Observable<Contacto> {
    const endpoint = this.apiConfig.contacts.update(`${idEmpresa}/${idPersona}`);
    return this.http.put<Contacto>(endpoint, contact);
  }

  deleteContact(idEmpresa: number, idPersona: number): Observable<void> {
    const endpoint = this.apiConfig.contacts.delete(`${idEmpresa}/${idPersona}`);
    return this.http.delete<void>(endpoint);
  }
}
