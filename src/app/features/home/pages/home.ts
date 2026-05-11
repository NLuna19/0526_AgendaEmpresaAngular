import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class HomePage implements OnInit {
  private router: Router = inject(Router);

  //todo move to a better place
  pageRoutes = {
    city: '/city',
    address: '/address',
    person: '/person',
    company: '/company',
    contact: '/contact',
  };

  ngOnInit(): void {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
