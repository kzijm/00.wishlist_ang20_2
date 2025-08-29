import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';

// form typing
// see https://stackoverflow.com/questions/72507263/angular-14-strictly-typed-reactive-forms-how-to-type-formgroup-model-using-exi
// userFormGroup: ModelFormGroup<Treasure>;
// userFormGroup: ModelFormGroup<Pick<UserModel, 'email' | 'password' >>;

type Unbox<T> = T extends Array<infer V> ? V : T;
export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: T[K] extends Array<any>
    ? FormArray<FormControl<Unbox<T[K]>>>
    : FormControl<T[K]>;
}>;

@Component({
  selector: 'app-dynamic-form-simple',
  standalone: false,
  templateUrl: './dynamic-form-simple.component.html',
  styleUrls: ['./dynamic-form-simple.component.scss'],
})
export class DynamicFormSimpleComponent {
  dynamicForm: FormGroup; // Main form group

  constructor(private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({
      name: [''], // Simple input field
      email: [''], // Another input field
      fields: this.fb.array([]), // Dynamic fields will be stored here
    });
  }

  // Getter to access the FormArray for dynamic fields
  get fields(): FormArray {
    return this.dynamicForm.get('fields') as FormArray;
  }

  get payload() {
    // console.log(this.fields);
    return JSON.stringify(this.dynamicForm.getRawValue());
  }

  /**
   * Adds a new field to the dynamic form.
   */
  addField() {
    const fieldGroup = this.fb.group({
      label: [''], // Label for the field
      value: [''], // Value of the field
    });
    this.fields.push(fieldGroup);
  }

  /**
   * Removes a field from the dynamic form at a specific index.
   * @param index Index of the field to be removed.
   */
  removeField(index: number) {
    this.fields.removeAt(index);
  }

  /**
   * Submits the form and logs its current value to the console.
   */
  submitForm() {
    console.log(this.dynamicForm);
  }
}
