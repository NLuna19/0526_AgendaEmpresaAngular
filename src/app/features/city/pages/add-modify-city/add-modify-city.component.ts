import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityFormComponent } from '../../components/city-form/city-form.component';
import { Ciudad } from '../../models/ciudad';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-add-modify-city',
  imports: [CommonModule, CityFormComponent],
  templateUrl: './add-modify-city.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddModifyCityComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cityService = inject(CityService);

  ciudad = signal<Ciudad | undefined>(undefined);
  loading = signal(false);
  error = signal<string | null>(null);

  isEditing = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditing.set(true);
      this.loadCity(Number(id));
    }
  }

  private loadCity(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.cityService.getCityById(id).subscribe({
      next: (city) => {
        this.ciudad.set(city);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar la ciudad');
        this.loading.set(false);
        console.error(err);
      },
    });
  }

  onFormSubmitted(): void {
    this.navigateBack();
  }

  navigateBack(): void {
    this.router.navigate(['/city']);
  }
}
