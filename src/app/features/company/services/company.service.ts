import { ApiConfig } from '@/app/core/config/api.config';
import { Empresa } from '@/app/features/company/models/empresa';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfig);

  getCompanies(): Observable<Empresa[]> {
    const endpoint = this.apiConfig.companies.list();
    return this.http.get<Empresa[]>(endpoint);
  }

  getCompanyById(id: number): Observable<Empresa> {
    const endpoint = this.apiConfig.companies.detail(id);
    return this.http.get<Empresa>(endpoint);
  }

  createCompany(company: Partial<Empresa>): Observable<Empresa> {
    const endpoint = this.apiConfig.companies.create();
    return this.http.post<Empresa>(endpoint, company);
  }

  updateCompany(id: number, company: Partial<Empresa>): Observable<Empresa> {
    const endpoint = this.apiConfig.companies.update(id);
    return this.http.put<Empresa>(endpoint, company);
  }

  deleteCompany(id: number): Observable<void> {
    const endpoint = this.apiConfig.companies.delete(id);
    return this.http.delete<void>(endpoint);
  }
}
