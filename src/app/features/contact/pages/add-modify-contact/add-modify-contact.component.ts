import { CompanyState } from '@/app/features/company/states/company.state';
import { PersonState } from '@/app/features/person/states/person.state';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { Contacto } from '../../models/contacto';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-modify-contact',
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './add-modify-contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddModifyContactComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);
  private companyState = inject(CompanyState);
  private personState = inject(PersonState);

  contacto = signal<Contacto | undefined>(undefined);
  loading = signal(false);
  error = signal<string | null>(null);

  empresaOptions = signal<{ label: string; value: number }[]>([]);
  personaOptions = signal<{ label: string; value: number }[]>([]);

  isEditing = signal(false);

  constructor() {
    const idEmpresa = this.route.snapshot.paramMap.get('idEmpresa');
    const idPersona = this.route.snapshot.paramMap.get('idPersona');

    this.loadCompanies();
    this.loadPeople();
    if (idEmpresa && idPersona) {
      this.isEditing.set(true);
      this.loadContact(Number(idEmpresa), Number(idPersona));
    }
  }

  private loadContact(idEmpresa: number, idPersona: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.contactService.getContactById(idEmpresa, idPersona).subscribe({
      next: (contact) => {
        this.contacto.set(contact);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el contacto');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  private loadCompanies(): void {
    this.companyState.load();
    this.empresaOptions.set(
      this.companyState.companies().map((empresa) => ({
        label: empresa.razonSocial,
        value: empresa.idEmpresa,
      }))
    );
  }

  private loadPeople(): void {
    this.personState.load();
    this.personaOptions.set(
      this.personState.people().map((persona) => ({
        label: `${persona.nombre} ${persona.apellido}`,
        value: persona.idPersona,
      }))
    );
  }

  onFormSubmitted(): void {
    this.navigateBack();
  }

  navigateBack(): void {
    this.router.navigate(['/contact']);
  }
}
