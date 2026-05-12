import { BasicButtonComponent } from '@/app/shared/components/button/basic-button/basic-button.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageButtonConfig } from '../constants';

@Component({
  selector: 'app-home',
  imports: [BasicButtonComponent],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class HomePage {
  private router: Router = inject(Router);
  buttonConfig = HomePageButtonConfig;

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
