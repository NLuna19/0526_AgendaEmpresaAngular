import { ReactiveFormComponent } from '@/app/shared/components/reactive-form/reactive-form.component';
import { FormField } from '@/app/shared/models/form-field.model';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';

import { Validators } from '@angular/forms';
import { Empresa } from '../../models/empresa';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-form',
  imports: [ReactiveFormComponent],
  templateUrl: './company-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormComponent {
  service = inject(CompanyService);

  empresa = input<Empresa | undefined>();
  addressOptions = input<{ label: string; value: number }[]>([]);
  formSubmitted = output<void>();

  readonly fields = computed<FormField[]>(() => [
    {
      key: 'razonSocial',
      label: 'Razón Social',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Nombre de la empresa',
    },
    {
      key: 'telefono',
      label: 'Teléfono',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Número de teléfono',
    },

    {
      key: 'direccion',
      label: 'Dirección',
      type: 'select',
      options: this.addressOptions(),
      value: this.empresa()?.direccion?.idDireccion,
      placeholder: 'Seleccionar dirección',
    },
  ]);

  readonly initialData = computed(() => {
    const empresaData = this.empresa();

    if (!empresaData) return undefined;

    return {
      razonSocial: empresaData.razonSocial,
      telefono: empresaData.telefono,
    };
  });

  get direccionInfo() {
    return this.empresa()?.direccion;
  }

  save(formValue: any): void {
    console.log('Form submitted with value:', formValue);

    const empresaData: Partial<Empresa> = {
      razonSocial: formValue.razonSocial,
      telefono: formValue.telefono,
      direccion: this.empresa()!.direccion,
    };

    const isEditing = !!this.empresa();

    if (isEditing) {
      this.service.updateCompany(this.empresa()!.idEmpresa, empresaData).subscribe({
        next: (response) => {
          console.log('Company updated successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error updating company:', error);
        },
      });
    } else {
      this.service.createCompany(empresaData).subscribe({
        next: (response) => {
          console.log('Company created successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error creating company:', error);
        },
      });
    }
  }
}
