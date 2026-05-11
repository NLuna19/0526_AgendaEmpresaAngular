import { ReactiveFormComponent } from '@/app/shared/components/reactive-form/reactive-form.component';
import { FormField } from '@/app/shared/models/form-field.model';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Direccion } from '../../models/direccion';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address-form',
  imports: [ReactiveFormComponent],
  templateUrl: './address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressFormComponent {
  service = inject(AddressService);

  address = input<Direccion | undefined>();
  cityOptions = input<{ label: string; value: number }[]>([]);
  formSubmitted = output<void>();

  readonly fields = computed<FormField[]>(() => [
    {
      key: 'calle',
      label: 'Calle',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Nombre de la calle',
    },
    {
      key: 'numero',
      label: 'Número',
      type: 'number',
      validators: [Validators.required],
      placeholder: 'Número de la calle',
    },
    {
      key: 'piso',
      label: 'Piso',
      type: 'text',
      placeholder: 'Piso (opcional)',
    },
    {
      key: 'depto',
      label: 'Departamento',
      type: 'text',
      placeholder: 'Departamento (opcional)',
    },
    {
      key: 'cp',
      label: 'Código Postal',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Código postal',
    },
    {
      key: 'ciudad',
      label: 'Ciudad',
      type: 'select',
      validators: [Validators.required],
      options: this.cityOptions(),
    },
  ]);

  readonly initialData = computed(() => {
    const addressData = this.address();

    if (!addressData) return undefined;

    return {
      calle: addressData.calle,
      numero: addressData.numero,
      piso: addressData.piso,
      depto: addressData.depto,
      cp: addressData.cp,
      ciudad: addressData.ciudad.idCiudad,
    };
  });

  save(formValue: any): void {
    console.log('Form submitted with value:', formValue);

    const addressData: any = {
      calle: formValue.calle,
      numero: formValue.numero,
      piso: formValue.piso,
      depto: formValue.depto,
      cp: formValue.cp,
      idCiudad: formValue.ciudad,
    };

    const isEditing = !!this.address();

    if (isEditing) {
      this.service.updateAddress(this.address()!.idDireccion, addressData).subscribe({
        next: (response) => {
          console.log('Address updated successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error updating address:', error);
        },
      });
    } else {
      this.service.createAddress(addressData).subscribe({
        next: (response) => {
          console.log('Address created successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error creating address:', error);
        },
      });
    }
  }
}
