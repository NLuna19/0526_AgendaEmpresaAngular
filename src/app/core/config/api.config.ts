import { environment } from '@/environments/environment';
import { Injectable } from '@angular/core';

/**
 * API endpoints configuration
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfig {
  private readonly baseUrl = environment.apiBaseUrl;

  /**
   * Cities endpoints
   */
  readonly cities = {
    list: () => `${this.baseUrl}/api/ciudades`,
    detail: (id: string | number) => `${this.baseUrl}/api/ciudades/${id}`,
    create: () => `${this.baseUrl}/api/ciudades`,
    update: (id: string | number) => `${this.baseUrl}/api/ciudades/${id}`,
    delete: (id: string | number) => `${this.baseUrl}/api/ciudades/${id}`,
  };

  /**
   * Addresses endpoints
   */
  readonly addresses = {
    list: () => `${this.baseUrl}/api/direcciones`,
    detail: (id: string | number) => `${this.baseUrl}/api/direcciones/${id}`,
    create: () => `${this.baseUrl}/api/direcciones`,
    update: (id: string | number) => `${this.baseUrl}/api/direcciones/${id}`,
    delete: (id: string | number) => `${this.baseUrl}/api/direcciones/${id}`,
  };

  /**
   * People endpoints
   */
  readonly people = {
    list: () => `${this.baseUrl}/api/personas`,
    detail: (id: string | number) => `${this.baseUrl}/api/personas/${id}`,
    create: () => `${this.baseUrl}/api/personas`,
    update: (id: string | number) => `${this.baseUrl}/api/personas/${id}`,
    delete: (id: string | number) => `${this.baseUrl}/api/personas/${id}`,
  };

  /**
   * Companies endpoints
   */
  readonly companies = {
    list: () => `${this.baseUrl}/api/empresas`,
    detail: (id: string | number) => `${this.baseUrl}/api/empresas/${id}`,
    create: () => `${this.baseUrl}/api/empresas`,
    update: (id: string | number) => `${this.baseUrl}/api/empresas/${id}`,
    delete: (id: string | number) => `${this.baseUrl}/api/empresas/${id}`,
  };

  /**
   * Contacts endpoints
   */
  readonly contacts = {
    list: () => `${this.baseUrl}/api/contactos-empresa`,
    detail: (id: string | number) => `${this.baseUrl}/api/contactos-empresa/${id}`,
    create: () => `${this.baseUrl}/api/contactos-empresa`,
    update: (id: string | number) => `${this.baseUrl}/api/contactos-empresa/${id}`,
    delete: (id: string | number) => `${this.baseUrl}/api/contactos-empresa/${id}`,
  };

  /**
   * Search endpoints
   */

  readonly search = {
    peopleByCities: () => `${this.baseUrl}/api/personas/busqueda/nombre-apellido-ciudades`,
  };

  /**
   * Get the base API URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
