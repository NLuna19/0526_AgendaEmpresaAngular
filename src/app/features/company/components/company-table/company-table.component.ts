import { SortTableComponent, TableColumn } from '@/app/shared/components/sort-table/sort-table';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from '../../models/empresa';
import { CompanyState } from '../../states/company.state';

@Component({
  selector: 'app-company-table',
  imports: [SortTableComponent],
  templateUrl: './company-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyTable {
  companyState = input.required<CompanyState>();
  private router = inject(Router);

  columns: TableColumn<Empresa>[] = [
    { field: 'idEmpresa', label: 'ID' },
    { field: 'razonSocial', label: 'Razón Social' },
    { field: 'telefono', label: 'Teléfono' },
    { field: 'direccion.calle', label: 'Calle' },
    { field: 'direccion.numero', label: 'Número' },
    { field: 'direccion.ciudad.nombre', label: 'Ciudad' },
    { field: 'direccion.ciudad.provincia', label: 'Provincia' },
    { field: 'direccion.ciudad.pais', label: 'Pais' },
  ];

  trackByCompany = (company: Empresa) => company.idEmpresa;

  onEdit(item: Empresa): void {
    this.router.navigate(['/company', item.idEmpresa]);
  }

  onDelete(item: Empresa): void {
    this.companyState().delete(item.idEmpresa);
  }
}
