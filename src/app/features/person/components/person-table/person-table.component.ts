import { SortTableComponent } from '@/app/shared/components/sort-table/sort-table';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Persona } from '../../models/persona';
import { PersonState } from '../../states/person.state';

@Component({
  selector: 'app-person-table',
  imports: [SortTableComponent],
  templateUrl: './person-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonTable {
  personState = input.required<PersonState>();

  columns = [
    { field: 'idPersona' as const, label: 'ID' },
    { field: 'nombre' as const, label: 'Nombre' },
    { field: 'apellido' as const, label: 'Apellido' },
    { field: 'email' as const, label: 'Email' },
    { field: 'telefono' as const, label: 'Teléfono' },
    { field: 'direccion.calle' as const, label: 'Calle' },
    { field: 'direccion.numero' as const, label: 'Número' },
    { field: 'direccion.ciudad.nombre' as const, label: 'Ciudad' },
    { field: 'direccion.ciudad.provincia' as const, label: 'Provincia' },
    { field: 'direccion.ciudad.pais' as const, label: 'País' },
  ];

  trackByPerson = (person: Persona) => person.idPersona;

  // onSortChange(event: { column: keyof Ciudad; direction: 'asc' | 'desc' }) {
  //   console.log('onSortChange:', event);
  // }
}
