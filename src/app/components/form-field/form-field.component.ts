import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {
  @Input() label = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() form!: any;
  @Input() type = 'text';
  @Input() name!: string;
  @Input() errorMessage= '';

  get control() {
    return this.form.controls[this.name];
  }
}