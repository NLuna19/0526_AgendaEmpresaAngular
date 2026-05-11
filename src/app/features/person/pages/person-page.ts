import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PersonTable } from '../components/person-table/person-table.component';
import { PersonState } from '../states/person.state';

@Component({
  selector: 'app-person-page',
  imports: [CommonModule, PersonTable],
  templateUrl: './person-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonPage implements OnInit {
  state = inject(PersonState);

  ngOnInit(): void {
    this.state.load();
  }

  navigateBack(): void {
    window.history.back();
  }
}
