import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BasicButtonComponent } from '../basic-button/basic-button.component';

@Component({
  selector: 'app-back-home-button',
  template: ` <app-basic-button [label]="label" [icon]="icon" (onClick)="onBackHomeClick()" /> `,
  imports: [ButtonModule, BasicButtonComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackHomeButtonComponent {
  router = inject(Router);
  label = 'Volver';
  icon = 'pi-arrow-left';

  onBackHomeClick(): void {
    this.router.navigate(['/home']);
  }
}
