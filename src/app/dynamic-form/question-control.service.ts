import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './questions/question-base';

@Injectable()
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<string>[] | null) {
    const group: any = {};
    if (questions) {
      questions.forEach((question) => {
        group[question.key] = question.required
          ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
      });
    }
    console.log('pass');
    return new FormGroup(group);
  }
}
