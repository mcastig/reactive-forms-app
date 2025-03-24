import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  public isValidField(fieldName: string): boolean | null {
    return (
      this.myForm.controls[fieldName].errors &&
      this.myForm.controls[fieldName].touched
    );
  }

  public getFieldError(fieldName: string): string | null {
    if(!this.myForm.controls[fieldName]) return null;

    const errors = this.myForm.controls[fieldName].errors ?? {};

    for( const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'This field is required.';
        case 'minlength':
          return `This field requires at least ${ errors['minlength'].requiredLength } characters.`;
        case 'min':
          return `Minimum value required ${ errors['min'].min }`;
      }
    }
    return null;
  }

  public onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
