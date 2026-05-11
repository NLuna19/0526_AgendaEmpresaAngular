import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Direccion } from '../models/direccion';
import { AddressService } from '../services/address.service';

@Injectable({ providedIn: 'root' })
export class AddressState {
  private service = inject(AddressService);
  private destroyRef = inject(DestroyRef);

  private _addresses = signal<Direccion[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  addresses = this._addresses.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  totalAddresses = computed(() => this.addresses().length);

  load() {
    this._loading.set(true);
    this._error.set(null);

    this.service
      .getAddresses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this._addresses.set(data);
          this._loading.set(false);
        },
        error: () => {
          this._error.set('Error loading addresses');
          this._loading.set(false);
        },
      });
  }

  create(address: Direccion): void {
    this.service.createAddress(address).subscribe((createdAddress) => {
      this._addresses.update((addresses) => [...addresses, createdAddress]);
    });
  }

  update(address: Direccion): void {
    this.service.updateAddress(address.idDireccion, address).subscribe((updatedAddress) => {
      this._addresses.update((addresses) =>
        addresses.map((a) => (a.idDireccion === updatedAddress.idDireccion ? updatedAddress : a))
      );
    });
  }

  delete(id: number): void {
    this.service.deleteAddress(id).subscribe(() => {
      this._addresses.update((addresses) => addresses.filter((a) => a.idDireccion !== id));
    });
  }
}
