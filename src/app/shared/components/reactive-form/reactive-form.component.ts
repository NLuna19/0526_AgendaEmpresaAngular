import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormField } from '../../models/form-field.model';
@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormComponent {
  private fb = new FormBuilder();
  readonly form = signal<FormGroup>(this.fb.group({}));

  fields = input.required<FormField[]>();
  initialData = input<Record<string, any>>();
  submitForm = output<any>();

  constructor() {
    effect(() => {
      const data = this.initialData() || {};
      const fieldsArray = this.fields();
      const group: Record<string, FormControl> = {};
      for (const field of fieldsArray) {
        const value = data[field.key] ?? field.value ?? null;
        group[field.key] = this.fb.control(value, field.validators ?? []);
      }
      this.form.set(this.fb.group(group));
    });
  }

  onSubmit(): void {
    const form = this.form();
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    this.submitForm.emit(form.getRawValue());
  }

  hasError(fieldName: string, error: string): boolean {
    const control = this.form().get(fieldName);
    return !!(control && control.touched && control.hasError(error));
  }
}
