import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityTable } from '../components/city-table/city-table.component';
import { CityState } from '../states/city.state';

@Component({
  selector: 'app-city-page',
  imports: [CommonModule, CityTable],
  templateUrl: './city-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityPage implements OnInit {
  private router: Router = inject(Router);
  state = inject(CityState);

  ngOnInit(): void {
    this.state.load();
  }

  navigateBack(): void {
    this.router.navigate(['/home']);
  }

  addCity(): void {
    this.router.navigate(['/city/new']);
  }
}
