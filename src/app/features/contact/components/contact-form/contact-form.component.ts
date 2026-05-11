import { ReactiveFormComponent } from '@/app/shared/components/reactive-form/reactive-form.component';
import { FormField } from '@/app/shared/models/form-field.model';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { Validators } from '@angular/forms';
import { Contacto } from '../../models/contacto';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormComponent],
  templateUrl: './contact-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  service = inject(ContactService);

  contacto = input<Contacto | undefined>();
  empresaOptions = input<{ label: string; value: number }[]>([]);
  personaOptions = input<{ label: string; value: number }[]>([]);
  formSubmitted = output<void>();

  readonly fields = computed<FormField[]>(() => [
    {
      key: 'empresa',
      label: 'Empresa',
      type: 'select',
      validators: [Validators.required],
      options: this.empresaOptions(),
    },
    {
      key: 'persona',
      label: 'Persona',
      type: 'select',
      validators: [Validators.required],
      options: this.personaOptions(),
    },
    {
      key: 'cargo',
      label: 'Cargo',
      type: 'text',
      validators: [Validators.required],
      placeholder: 'Cargo de la persona en la empresa',
    },
  ]);

  readonly initialData = computed(() => {
    const contactoData = this.contacto();

    if (!contactoData) return undefined;

    return {
      empresa: contactoData.empresa.idEmpresa,
      persona: contactoData.persona.idPersona,
      cargo: contactoData.cargo,
    };
  });

  save(formValue: any): void {
    console.log('Form submitted with value:', formValue);

    const contactoData: any = {
      idEmpresa: formValue.empresa,
      idPersona: formValue.persona,
      cargo: formValue.cargo,
    };

    const isEditing = !!this.contacto();

    if (isEditing) {
      this.service
        .updateContact(
          this.contacto()!.empresa.idEmpresa,
          this.contacto()!.persona.idPersona,
          contactoData
        )
        .subscribe({
          next: (response) => {
            console.log('Contact updated successfully:', response);
            this.formSubmitted.emit();
          },
          error: (error) => {
            console.error('Error updating contact:', error);
          },
        });
    } else {
      this.service.createContact(contactoData).subscribe({
        next: (response) => {
          console.log('Contact created successfully:', response);
          this.formSubmitted.emit();
        },
        error: (error) => {
          console.error('Error creating contact:', error);
        },
      });
    }
  }
}
