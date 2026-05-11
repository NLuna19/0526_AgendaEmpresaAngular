import { SortTableComponent, TableColumn } from '@/app/shared/components/sort-table/sort-table';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto } from '../../models/contacto';
import { ContactState } from '../../states/contact.state';

interface ContactTableRow {
  idEmpresa: number;
  idPersona: number;
  empresaNombre: string;
  personaNombre: string;
  cargo: string;
}

@Component({
  selector: 'app-contact-table',
  imports: [SortTableComponent],
  templateUrl: './contact-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactTable {
  contactState = input.required<ContactState>();
  private router = inject(Router);

  columns: TableColumn<ContactTableRow>[] = [
    { field: 'empresaNombre', label: 'Empresa' },
    { field: 'personaNombre', label: 'Persona' },
    { field: 'cargo', label: 'Cargo' },
  ];

  trackByContact = (item: ContactTableRow) => `${item.idEmpresa}-${item.idPersona}`;

  get data() {
    return this.contactState()
      .contacts()
      .map((contact: Contacto) => ({
        idEmpresa: contact.empresa.idEmpresa,
        idPersona: contact.persona.idPersona,
        empresaNombre: contact.empresa.razonSocial,
        personaNombre: `${contact.persona.nombre} ${contact.persona.apellido}`,
        cargo: contact.cargo,
      }));
  }

  onEdit(item: ContactTableRow): void {
    this.router.navigate(['/contact', item.idEmpresa, item.idPersona]);
  }

  onDelete(item: ContactTableRow): void {
    this.contactState().delete(item.idEmpresa, item.idPersona);
  }
}
