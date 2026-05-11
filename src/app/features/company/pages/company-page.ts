import { BackHomeButtonComponent, BasicButtonComponent } from '@/app/shared/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyTable } from '../components/company-table/company-table.component';
import { CompanyState } from '../states/company.state';

@Component({
  selector: 'app-company-page',
  imports: [CommonModule, CompanyTable, BasicButtonComponent, BackHomeButtonComponent],
  templateUrl: './company-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyPage implements OnInit {
  private router: Router = inject(Router);
  state = inject(CompanyState);

  addBtnIcon = 'pi-plus';
  addBtnLabel = 'Agregar Empresa';

  ngOnInit(): void {
    this.state.load();
  }

  addCompany(): void {
    this.router.navigate(['/company/new']);
  }
}
