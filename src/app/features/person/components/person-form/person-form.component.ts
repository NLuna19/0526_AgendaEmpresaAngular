import { ReactiveFormComponent } from '@/app/shared/components/reactive-form/reactive-form.component';
import { FormField } from '@/app/shared/models/form-field.model';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';

import { Direccion } from '@/app/features/address/models/direccion';
import { Ciudad } from '@/app/features/city/models/ciudad';
import { Validators } from '@angular/forms';
import { Persona } from '../../models/persona';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-form',
  imports: [ReactiveFormComponent],
  templateUrl: './person-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent {
  service = inject(PersonService);

  persona = input<Persona | undefined>();
  addressOptions = input<{ label: string; value: number }[]>([]);
  formSubmitted = output<void>();

  readonly fields = computed<FormField[]>(() => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Nombre de la persona',
    },
    {
      key: 'apellido',
      label: 'Apellido',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Apellido de la persona',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      validators: [Validators.required, Validators.email],
      placeholder: 'Email de la persona',
    },
    {
      key: 'telefono',
      label: 'Teléfono',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Número de teléfono',
    },
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
      placeholder: 'Número',
    },
    {
      key: 'piso',
      label: 'Piso',
      type: 'text',
      placeholder: 'Piso de la dirección',
    },
    {
      key: 'depto',
      label: 'Departamento',
      type: 'text',
      placeholder: 'Departamento de la dirección',
    },
    {
      key: 'cp',
      label: 'Código Postal',
      type: 'text',
      placeholder: 'Código postal de la dirección',
    },
    {
      key: 'ciudad',
      label: 'Ciudad',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Ciudad de la dirección',
    },
    {
      key: 'provincia',
      label: 'Provincia',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Provincia de la dirección',
    },
    {
      key: 'pais',
      label: 'País',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'País de la dirección',
    },
  ]);

  readonly initialData = computed(() => {
    const personaData = this.persona();

    if (!personaData) return undefined;

    return {
      nombre: personaData.nombre,
      apellido: personaData.apellido,
      email: personaData.email,
      telefono: personaData.telefono,
      calle: personaData.direccion.calle,
      numero: personaData.direccion.numero,
      piso: personaData.direccion.piso,
      depto: personaData.direccion.depto,
      cp: personaData.direccion.cp,
      ciudad: personaData.direccion.ciudad.nombre,
      provincia: personaData.direccion.ciudad.provincia,
      pais: personaData.direccion.ciudad.pais,
    };
  });

  get direccionInfo() {
    return this.persona()?.direccion;
  }

  save(formValue: any): void {
    console.log('Form submitted with value:', formValue);

    const _ciudadData: Partial<Ciudad> = {
      nombre: formValue.ciudad,
      provincia: formValue.provincia,
      pais: formValue.pais,
    };

    const _direccionData = {
      calle: formValue.calle,
      numero: formValue.numero,
      piso: formValue.piso,
      depto: formValue.depto,
      cp: formValue.cp,
      ciudad: _ciudadData,
    };

    const personaData: Partial<Persona> = {
      nombre: formValue.nombre,
      apellido: formValue.apellido,
      email: formValue.email,
      telefono: formValue.telefono,
      direccion: _direccionData as Direccion,
    };

    const isEditing = !!this.persona();

    if (isEditing) {
      this.service.updatePerson(this.persona()!.idPersona, personaData).subscribe({
        next: (response) => {
          console.log('Person updated successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error updating person:', error);
        },
      });
    } else {
      this.service.createPerson(personaData).subscribe({
        next: (response) => {
          console.log('Person created successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error creating person:', error);
        },
      });
    }
  }
}
