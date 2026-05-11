import { Routes } from '@angular/router';
import { AddressPage } from './features/address/pages/address-page';
import { AddModifyCityComponent } from './features/city/pages/add-modify-city/add-modify-city.component';
import { CityPage } from './features/city/pages/city-page';
import { AddModifyCompanyComponent } from './features/company/pages/add-modify-company/add-modify-company.component';
import { CompanyPage } from './features/company/pages/company-page';
import { AddModifyContactComponent } from './features/contact/pages/add-modify-contact/add-modify-contact.component';
import { ContactPage } from './features/contact/pages/contact-page';
import { HomePage } from './features/home/pages/home';
import { AddModifyPersonComponent } from './features/person/pages/add-modify-person/add-modify-person.component';
import { PersonPage } from './features/person/pages/person-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'city',
    children: [
      { path: '', component: CityPage },
      { path: 'new', component: AddModifyCityComponent },
      { path: ':id', component: AddModifyCityComponent },
    ],
  },
  {
    path: 'address',
    children: [
      { path: '', component: AddressPage },
      { path: 'new', component: AddModifyCityComponent },
      { path: ':id', component: AddModifyCityComponent },
    ],
  },
  {
    path: 'company',
    children: [
      { path: '', component: CompanyPage },
      { path: 'new', component: AddModifyCompanyComponent },
      { path: ':id', component: AddModifyCompanyComponent },
    ],
  },
  {
    path: 'person',
    children: [
      { path: '', component: PersonPage },
      { path: 'new', component: AddModifyPersonComponent },
      { path: ':id', component: AddModifyPersonComponent },
    ],
  },
  {
    path: 'contact',
    children: [
      { path: '', component: ContactPage },
      { path: 'new', component: AddModifyContactComponent },
      { path: ':idEmpresa/:idPersona', component: AddModifyContactComponent },
    ],
  },
  { path: '**', redirectTo: '' }, // fallback
];
