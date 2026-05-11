import { BackHomeButtonComponent, BasicButtonComponent } from '@/app/shared/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonTable } from '../components/person-table/person-table.component';
import { PersonState } from '../states/person.state';

@Component({
  selector: 'app-person-page',
  imports: [CommonModule, PersonTable, BasicButtonComponent, BackHomeButtonComponent],
  templateUrl: './person-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonPage implements OnInit {
  private router: Router = inject(Router);
  state = inject(PersonState);

  addBtnIcon = 'pi-plus';
  addBtnLabel = 'Agregar Persona';

  ngOnInit(): void {
    this.state.load();
  }

  addPerson(): void {
    this.router.navigate(['/person/new']);
  }
}
