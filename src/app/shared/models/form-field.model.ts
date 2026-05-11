import { ValidatorFn } from '@angular/forms';

export type FieldType = 'text' | 'email' | 'number' | 'password' | 'select' | 'textarea';

export interface FormField {
  key: string;

  label: string;

  type: FieldType;

  value?: unknown;

  placeholder?: string;

  validators?: ValidatorFn[];

  options?: {
    label: string;
    value: unknown;
  }[];
}
