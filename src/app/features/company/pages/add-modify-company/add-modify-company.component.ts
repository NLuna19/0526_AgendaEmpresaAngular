import { AddressState } from '@/app/features/address/states/address.state';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyFormComponent } from '../../components/company-form/company-form.component';
import { Empresa } from '../../models/empresa';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-add-modify-company',
  imports: [CommonModule, CompanyFormComponent],
  templateUrl: './add-modify-company.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddModifyCompanyComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private companyService = inject(CompanyService);
  private addressState = inject(AddressState);

  empresa = signal<Empresa | undefined>(undefined);
  loading = signal(false);
  error = signal<string | null>(null);

  addressOptions = signal<{ label: string; value: number }[]>([]);

  isEditing = signal(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    this.loadAddresses();
    if (id) {
      this.isEditing.set(true);
      this.loadCompany(Number(id));
    }
  }

  private loadCompany(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.companyService.getCompanyById(id).subscribe({
      next: (company) => {
        this.empresa.set(company);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar la empresa');
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
    this.router.navigate(['/company']);
  }
}
