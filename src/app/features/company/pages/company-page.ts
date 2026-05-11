import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyTable } from '../components/company-table/company-table.component';
import { CompanyState } from '../states/company.state';

@Component({
  selector: 'app-company-page',
  imports: [CommonModule, CompanyTable],
  templateUrl: './company-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyPage implements OnInit {
  private router: Router = inject(Router);
  state = inject(CompanyState);

  ngOnInit(): void {
    this.state.load();
  }

  navigateBack(): void {
    this.router.navigate(['/home']);
  }

  addCompany(): void {
    this.router.navigate(['/company/new']);
  }
}
