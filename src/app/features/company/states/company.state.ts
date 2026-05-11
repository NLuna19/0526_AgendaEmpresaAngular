import { Empresa } from '@/app/features/company/models/empresa';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompanyService } from '../services/company.service';

@Injectable({ providedIn: 'root' })
export class CompanyState {
  private service = inject(CompanyService);
  private destroyRef = inject(DestroyRef);

  private _companies = signal<Empresa[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  companies = this._companies.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  totalCompanies = computed(() => this.companies().length);

  load() {
    this._loading.set(true);
    this._error.set(null);

    this.service
      .getCompanies()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this._companies.set(data);
          this._loading.set(false);
        },
        error: () => {
          this._error.set('Error loading companies');
          this._loading.set(false);
        },
      });
  }

  create(company: Empresa): void {
    this.service.createCompany(company).subscribe((createdCompany) => {
      this._companies.update((companies) => [...companies, createdCompany]);
    });
  }

  update(company: Empresa): void {
    this.service.updateCompany(company.idEmpresa, company).subscribe((updatedCompany) => {
      this._companies.update((companies) =>
        companies.map((c) => (c.idEmpresa === updatedCompany.idEmpresa ? updatedCompany : c))
      );
    });
  }

  delete(id: number): void {
    this.service.deleteCompany(id).subscribe(() => {
      this._companies.update((companies) => companies.filter((c) => c.idEmpresa !== id));
    });
  }
}
