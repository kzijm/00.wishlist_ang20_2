import { Component, computed, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './dynamic-form-question.component';
import { QuestionBase } from './questions/question-base';
import { QuestionControlService } from './question-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService],
  imports: [QuestionComponent, ReactiveFormsModule],
})
export class DynamicFormComponent {
  private readonly qcs = inject(QuestionControlService);
  questions = input<QuestionBase<string>[] | null>([]);
  form = computed<FormGroup>(() =>
    this.qcs.toFormGroup(this.questions() as QuestionBase<string>[]),
  );

  payLoad = '';

  /**
   * Adds a new field to the dynamic form.
   */
  // addField() {
  //   const fieldGroup = this.fb.group({
  //     label: [''], // Label for the field
  //     value: [''], // Value of the field
  //   });
  //   this.fields.push(fieldGroup);
  // }

  onSubmit() {
    console.log(this.form());
    this.payLoad = JSON.stringify(this.form().getRawValue());
  }
}
