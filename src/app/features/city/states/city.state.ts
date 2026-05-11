import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Ciudad } from '../models/ciudad';
import { CityService } from '../services/city.service';

@Injectable({ providedIn: 'root' })
export class CityState {
  private service = inject(CityService);
  private destroyRef = inject(DestroyRef);

  private _cities = signal<Ciudad[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  cities = this._cities.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  totalCities = computed(() => this.cities().length);

  load() {
    this._loading.set(true);
    this._error.set(null);

    this.service
      .getCities()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this._cities.set(data);
          this._loading.set(false);
        },
        error: () => {
          this._error.set('Error loading cities');
          this._loading.set(false);
        },
      });
  }

  create(city: Ciudad): void {
    this.service.createCity(city).subscribe((createdCity) => {
      this._cities.update((cities) => [...cities, createdCity]);
    });
  }

  update(city: Ciudad): void {
    this.service.updateCity(city.idCiudad, city).subscribe((updatedCity) => {
      this._cities.update((cities) =>
        cities.map((c) => (c.idCiudad === updatedCity.idCiudad ? updatedCity : c))
      );
    });
  }

  delete(id: number): void {
    this.service.deleteCity(id).subscribe(() => {
      this._cities.update((cities) => cities.filter((c) => c.idCiudad !== id));
    });
  }
}
