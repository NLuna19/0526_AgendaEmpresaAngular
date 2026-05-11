import { BackHomeButtonComponent, BasicButtonComponent } from '@/app/shared/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressTable } from '../components/address-table/address-table.component';
import { AddressState } from '../states/address.state';

@Component({
  selector: 'app-address-page',
  imports: [CommonModule, AddressTable, BasicButtonComponent, BackHomeButtonComponent],
  templateUrl: './address-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressPage implements OnInit {
  private router: Router = inject(Router);
  state = inject(AddressState);

  addBtnIcon = 'pi-plus';
  addBtnLabel = 'Agregar Dirección';

  ngOnInit(): void {
    this.state.load();
  }

  navigateBack(): void {
    this.router.navigate(['/home']);
  }

  addAddress(): void {
    this.router.navigate(['/address/new']);
  }
}
