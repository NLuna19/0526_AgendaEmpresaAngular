import { AdvancedSearchComponent } from '@/app/shared/components';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CityState } from '../../../city/states/city.state';
import { PersonService } from '../../services/person.service';
import { PersonState } from '../../states/person.state';

@Component({
  selector: 'app-person-search',
  imports: [AdvancedSearchComponent],
  template: `
    <div class="mb-4">
      <app-advanced-search
        placeholder="Buscar por nombre..."
        tagPlaceholder="Seleccionar ciudades..."
        [tagOptions]="cityOptions()"
        (onSearch)="onSearch($event)"
      ></app-advanced-search>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonSearchComponent implements OnInit {
  private personService = inject(PersonService);
  private personState = inject(PersonState);
  private cityState = inject(CityState);
  private destroyRef = inject(DestroyRef);

  cityOptions = computed(() =>
    this.cityState.cities().map((city) => ({
      label: city.nombre,
      value: city.nombre,
    }))
  );

  ngOnInit(): void {
    if (this.cityState.cities().length === 0) {
      this.cityState.load();
    }
  }

  onSearch(event: { text: string; tags: string[] }): void {
    const [name, lastName] = event.text.split(' ');
    this.personService
      .searchPersonByCities(name || '', lastName || '', event.tags)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.personState.setSearchResults(data);
        },
        error: () => {
          console.error('Error searching people');
        },
      });
  }
}
