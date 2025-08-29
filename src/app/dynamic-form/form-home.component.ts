import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form.component';
import { QuestionService } from './questions/question.service';
import { QuestionBase } from './questions/question-base';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="row mt-4 gx-3 gx-lg-5">
        <h2>Job Application for Heroes</h2>
        <app-dynamic-form [questions]="questions$ | async" />
      </div>
    </div>
  `,
  providers: [QuestionService],
  imports: [AsyncPipe, DynamicFormComponent],
})
export class FormHomeComponent {
  questions$: Observable<QuestionBase<string>[]> =
    inject(QuestionService).getQuestions();
}
