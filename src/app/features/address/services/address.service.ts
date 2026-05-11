import { ApiConfig } from '@/app/core/config/api.config';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Direccion } from '../models/direccion';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfig);

  getAddresses(): Observable<Direccion[]> {
    const endpoint = this.apiConfig.addresses.list();
    return this.http.get<Direccion[]>(endpoint);
  }

  getAddressById(id: number): Observable<Direccion> {
    const endpoint = this.apiConfig.addresses.detail(id);
    return this.http.get<Direccion>(endpoint);
  }

  createAddress(address: Partial<Direccion>): Observable<Direccion> {
    const endpoint = this.apiConfig.addresses.create();
    return this.http.post<Direccion>(endpoint, address);
  }

  updateAddress(id: number, address: Partial<Direccion>): Observable<Direccion> {
    const endpoint = this.apiConfig.addresses.update(id);
    return this.http.put<Direccion>(endpoint, address);
  }

  deleteAddress(id: number): Observable<void> {
    const endpoint = this.apiConfig.addresses.delete(id);
    return this.http.delete<void>(endpoint);
  }
}
