import { ReactiveFormComponent } from '@/app/shared/components/reactive-form/reactive-form.component';
import { FormField } from '@/app/shared/models/form-field.model';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';

import { Validators } from '@angular/forms';
import { Ciudad } from '../../models/ciudad';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-form',
  imports: [ReactiveFormComponent],
  templateUrl: './city-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityFormComponent {
  service = inject(CityService);

  ciudad = input<Ciudad | undefined>();
  formSubmitted = output<void>();

  fields: FormField[] = [
    {
      key: 'ciudad',
      label: 'Ciudad',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Nombre de la ciudad',
    },
    {
      key: 'provincia',
      label: 'Provincia',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Nombre de la provincia',
    },
    {
      key: 'pais',
      label: 'País',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Nombre del país',
    },
  ];

  readonly initialData = computed(() => {
    const cityData = this.ciudad();

    if (!cityData) return undefined;

    return {
      ciudad: cityData.nombre,
      provincia: cityData.provincia,
      pais: cityData.pais,
    };
  });

  save(formValue: any): void {
    console.log('Form submitted with value:', formValue);

    const ciudadData: Partial<Ciudad> = {
      nombre: formValue.ciudad,
      provincia: formValue.provincia,
      pais: formValue.pais,
    };

    const isEditing = !!this.ciudad();

    if (isEditing) {
      this.service.updateCity(this.ciudad()!.idCiudad, ciudadData).subscribe({
        next: (response) => {
          console.log('City updated successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error updating city:', error);
        },
      });
    } else {
      this.service.createCity(ciudadData).subscribe({
        next: (response) => {
          console.log('City created successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error creating city:', error);
        },
      });
    }
  }
}
