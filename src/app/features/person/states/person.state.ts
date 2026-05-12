import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Persona } from '../models/persona';
import { PersonService } from '../services/person.service';

@Injectable({ providedIn: 'root' })
export class PersonState {
  private service = inject(PersonService);
  private destroyRef = inject(DestroyRef);

  private _people = signal<Persona[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  people = this._people.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  totalPeople = computed(() => this.people().length);

  load() {
    this._loading.set(true);
    this._error.set(null);

    this.service
      .getPeople()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this._people.set(data);
          this._loading.set(false);
        },
        error: () => {
          this._error.set('Error loading people');
          this._loading.set(false);
        },
      });
  }

  create(person: Persona): void {
    this.service.createPerson(person).subscribe((createdPerson) => {
      this._people.update((people) => [...people, createdPerson]);
    });
  }

  update(person: Persona): void {
    this.service.updatePerson(person.idPersona, person).subscribe((updatedPerson) => {
      this._people.update((people) =>
        people.map((p) => (p.idPersona === updatedPerson.idPersona ? updatedPerson : p))
      );
    });
  }

  delete(id: number): void {
    this.service.deletePerson(id).subscribe(() => {
      this._people.update((people) => people.filter((p) => p.idPersona !== id));
    });
  }

  setSearchResults(people: Persona[]): void {
    this._people.set(people);
  }
}
