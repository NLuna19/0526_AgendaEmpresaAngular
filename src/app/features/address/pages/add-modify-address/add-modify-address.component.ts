import { CityState } from '@/app/features/city/states/city.state';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { Direccion } from '../../models/direccion';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-add-modify-address',
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './add-modify-address.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddModifyAddressComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private addressService = inject(AddressService);
  private cityState = inject(CityState);

  address = signal<Direccion | undefined>(undefined);
  loading = signal(false);
  error = signal<string | null>(null);

  cityOptions = signal<{ label: string; value: number }[]>([]);

  isEditing = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    this.loadCities();
    if (id) {
      this.isEditing.set(true);
      this.loadAddress(Number(id));
    }
  }

  private loadAddress(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.addressService.getAddressById(id).subscribe({
      next: (address) => {
        this.address.set(address);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar la dirección');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  private loadCities(): void {
    this.cityState.load();
    this.cityOptions.set(
      this.cityState.cities().map((city) => ({
        label: `${city.nombre}, ${city.provincia}, ${city.pais}`,
        value: city.idCiudad,
      }))
    );
  }

  onFormSubmitted(): void {
    this.navigateBack();
  }

  navigateBack(): void {
    this.router.navigate(['/address']);
  }
}
