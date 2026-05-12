import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-basic-button',
  template: `
    <div class="card flex justify-center" [class]="classes()?.container">
      <button
        pButton
        (click)="_onClick($event)"
        size="small"
        color="primary"
        [class]="classes()?.button"
      >
        @if (icon().length > 0) {
          <i [class]="'pi ' + icon()" pButtonIcon></i>
        }
        <span pButtonLabel>{{ label() }}</span>
      </button>
    </div>
  `,
  imports: [ButtonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicButtonComponent {
  label = input<string>('button');
  icon = input<string>('');
  classes = input<{ container?: string; button?: string } | undefined>(undefined);
  onClick = output<Event>();

  _onClick(event: Event): void {
    this.onClick.emit(event);
  }
}
