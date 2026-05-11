import { SortTableComponent, TableColumn } from '@/app/shared/components/sort-table/sort-table';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Ciudad } from '../../models/ciudad';
import { CityState } from '../../states/city.state';

@Component({
  selector: 'app-city-table',
  imports: [SortTableComponent],
  templateUrl: './city-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityTable {
  cityState = input.required<CityState>();
  private router = inject(Router);

  columns: TableColumn<Ciudad>[] = [
    { field: 'idCiudad' as const, label: 'ID' },
    { field: 'nombre' as const, label: 'Ciudad' },
    { field: 'provincia' as const, label: 'Provincia' },
    { field: 'pais' as const, label: 'País' },
  ];

  trackByCity = (city: Ciudad) => city.idCiudad;

  onEdit(item: Ciudad): void {
    this.router.navigate(['/city', item.idCiudad]);
  }

  onDelete(item: Ciudad): void {
    this.cityState().delete(item.idCiudad);
  }
}
