import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output, TemplateRef } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

export type TableColumn<T> = {
  field: string;
  label: string;
};

@Component({
  selector: 'app-sort-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './sort-table.html',
  styleUrl: './sort-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortTableComponent<T extends object> {
  data = input.required<T[]>();

  columns = input.required<TableColumn<T>[]>();

  rowTemplate = input<TemplateRef<{ $implicit: T }> | null>(null);

  isLoading = input(false);

  emptyMessage = input('No hay datos para mostrar');

  showActions = input(false);

  edit = output<T>();

  delete = output<T>();

  onEdit(item: T): void {
    this.edit?.emit(item);
  }

  onDelete(item: T): void {
    this.delete?.emit(item);
  }

  resolveField(item: any, field: string): unknown {
    return field.split('.').reduce((obj, key) => obj?.[key], item);
  }
}
