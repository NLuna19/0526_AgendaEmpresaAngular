import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-search',
  template: `
    <div class="flex gap-2">
      <p-inputGroup>
        <input
          pInputText
          type="text"
          [(ngModel)]="_searchValue"
          (keyup.enter)="_onSearch()"
          [placeholder]="placeholder()"
        />
        <button
          pButton
          type="button"
          pInputGroupAddon
          icon="pi pi-search"
          (click)="_onSearch()"
        ></button>
      </p-inputGroup>
    </div>
  `,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  placeholder = input<string>('Buscar...');
  onSearch = output<string>();

  _searchValue: string = '';

  _onSearch(): void {
    this.onSearch.emit(this._searchValue);
  }
}
