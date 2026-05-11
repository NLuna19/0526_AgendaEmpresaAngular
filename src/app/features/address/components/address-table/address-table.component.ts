import { SortTableComponent, TableColumn } from '@/app/shared/components/sort-table/sort-table';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Direccion } from '../../models/direccion';
import { AddressState } from '../../states/address.state';

@Component({
  selector: 'app-address-table',
  imports: [SortTableComponent],
  templateUrl: './address-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressTable {
  addressState = input.required<AddressState>();
  private router = inject(Router);

  columns: TableColumn<Direccion>[] = [
    { field: 'calle', label: 'Calle' },
    { field: 'numero', label: 'Número' },
    { field: 'piso', label: 'Piso' },
    { field: 'depto', label: 'Depto' },
    { field: 'cp', label: 'Código Postal' },
    { field: 'ciudad.nombre', label: 'Ciudad' },
  ];

  trackByAddress = (address: Direccion) => address.idDireccion;

  onEdit(item: Direccion): void {
    this.router.navigate(['/address', item.idDireccion]);
  }

  onDelete(item: Direccion): void {
    this.addressState().delete(item.idDireccion);
  }
}
