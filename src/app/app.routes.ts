import { Routes } from '@angular/router';
import { AddModifyCityComponent } from './features/city/pages/add-modify-city/add-modify-city.component';
import { CityPage } from './features/city/pages/city-page';
import { AddModifyCompanyComponent } from './features/company/pages/add-modify-company/add-modify-company.component';
import { CompanyPage } from './features/company/pages/company-page';
import { HomePage } from './features/home/pages/home';
import { PersonPage } from './features/person/pages/person-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'city',
    component: CityPage,
  },
  {
    path: 'city/new',
    component: AddModifyCityComponent,
  },
  {
    path: 'city/:id',
    component: AddModifyCityComponent,
  },
  // {
  //   path: 'address',
  //   component: AddressPage,
  // },
  {
    path: 'company',
    component: CompanyPage,
  },
  {
    path: 'company/new',
    component: AddModifyCompanyComponent,
  },
  {
    path: 'company/:id',
    component: AddModifyCompanyComponent,
  },
  {
    path: 'person',
    component: PersonPage,
  },
  // {
  //   path: 'contact',
  //   component: ContactPage,
  // },

  //   {
  //     path: 'admin',
  //     component: AdminPage,
  //   },
  { path: '**', redirectTo: '' }, // fallback
];
