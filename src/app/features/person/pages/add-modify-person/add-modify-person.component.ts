import { AddressState } from '@/app/features/address/states/address.state';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonFormComponent } from '../../components/person-form/person-form.component';
import { Persona } from '../../models/persona';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-add-modify-person',
  imports: [CommonModule, PersonFormComponent],
  templateUrl: './add-modify-person.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddModifyPersonComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private personService = inject(PersonService);
  private addressState = inject(AddressState);

  persona = signal<Persona | undefined>(undefined);
  loading = signal(false);
  error = signal<string | null>(null);

  addressOptions = signal<{ label: string; value: number }[]>([]);

  isEditing = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    this.loadAddresses();
    if (id) {
      this.isEditing.set(true);
      this.loadPerson(Number(id));
    }
  }

  private loadPerson(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.personService.getPersonById(id).subscribe({
      next: (person) => {
        this.persona.set(person);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar la persona');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  private loadAddresses(): void {
    this.addressState.load();
    this.addressOptions.set(
      this.addressState.addresses().map((address) => ({
        label: `${address.calle} ${address.numero}, ${address.ciudad.nombre}`,
        value: address.idDireccion,
      }))
    );
  }

  onFormSubmitted(): void {
    this.navigateBack();
  }

  navigateBack(): void {
    this.router.navigate(['/person']);
  }
}
