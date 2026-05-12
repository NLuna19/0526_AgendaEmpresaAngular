import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-advanced-search',
  template: `
    <div class="flex gap-2">
      <p-inputGroup class="flex-1">
        <input
          pInputText
          type="text"
          [(ngModel)]="_searchText"
          (keyup.enter)="_onSearch()"
          [placeholder]="placeholder()"
        />
      </p-inputGroup>

      <p-multiSelect
        [(ngModel)]="_selectedTags"
        [options]="tagOptions()"
        optionLabel="label"
        optionValue="value"
        [showToggleAll]="false"
        [placeholder]="tagPlaceholder()"
        [display]="'chip'"
        (onChange)="_onSearch()"
        class="flex-1"
      ></p-multiSelect>

      <button class="w-20" pButton type="button" icon="pi pi-search" (click)="_onSearch()"></button>
    </div>
  `,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    MultiSelectModule,
    ButtonModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchComponent {
  placeholder = input<string>('Buscar por texto...');
  tagPlaceholder = input<string>('Seleccionar tags...');
  tagOptions = input<Array<{ label: string; value: string }>>([]);

  onSearch = output<{ text: string; tags: string[] }>();

  _searchText: string = '';
  _selectedTags: string[] = [];

  _onSearch(): void {
    this.onSearch.emit({
      text: this._searchText,
      tags: this._selectedTags,
    });
  }
}
