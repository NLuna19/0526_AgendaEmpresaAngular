import { Contacto } from '@/app/features/contact/models/contacto';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContactService } from '../services/contact.service';

@Injectable({ providedIn: 'root' })
export class ContactState {
  private service = inject(ContactService);
  private destroyRef = inject(DestroyRef);

  private _contacts = signal<Contacto[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  contacts = this._contacts.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  totalContacts = computed(() => this.contacts().length);

  load() {
    this._loading.set(true);
    this._error.set(null);

    this.service
      .getContacts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this._contacts.set(data);
          this._loading.set(false);
        },
        error: () => {
          this._error.set('Error loading contacts');
          this._loading.set(false);
        },
      });
  }

  create(contact: Contacto): void {
    this.service.createContact(contact).subscribe((createdContact) => {
      this._contacts.update((contacts) => [...contacts, createdContact]);
    });
  }

  update(contact: Contacto): void {
    this.service.updateContact(contact.idContacto, contact).subscribe((updatedContact) => {
      this._contacts.update((contacts) =>
        contacts.map((c) => (c.idContacto === updatedContact.idContacto ? updatedContact : c))
      );
    });
  }

  delete(id: number): void {
    this.service.deleteContact(id).subscribe(() => {
      this._contacts.update((contacts) => contacts.filter((c) => c.idContacto !== id));
    });
  }
}
