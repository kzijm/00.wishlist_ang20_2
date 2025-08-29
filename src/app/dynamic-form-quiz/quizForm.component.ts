import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

type formInputTypes = 'input' | 'checkbox';

type FormAnswer = FormGroup<{
  text: FormControl<string>;
  isRightAnswer: FormControl<number>;
}>;

type FormQuestion = FormGroup<{
  questionName: FormControl<string>;
  answers: FormArray<FormAnswer>;
}>;

type Form = FormGroup<{
  questions: FormArray<FormQuestion>;
}>;

@Component({
  selector: 'quiz-form',
  standalone: true,
  templateUrl: './quizForm.component.html',
  styleUrl: './quizForm.component.scss',
  imports: [ReactiveFormsModule],
})
export class QuizFormComponent {
  fb = inject(NonNullableFormBuilder);
  quizForm: Form = this.fb.group({
    questions: this.fb.array<FormQuestion>([this.generateQuestion()]),
  });

  get questions() {
    return this.quizForm.controls.questions;
  }

  generateQuestion(): FormQuestion {
    return this.fb.group({
      questionName: '',
      answers: this.fb.array<FormAnswer>([]),
    });
  }

  generateAnswer(): FormAnswer {
    return this.fb.group({
      text: '',
      isRightAnswer: 0,
    });
  }

  addQuestion(): void {
    this.questions.push(this.generateQuestion());
  }

  removeQuestion(questionIndex: number): void {
    this.questions.removeAt(questionIndex);
  }

  addAnswer(questionIndex: number): void {
    const newAnswer: FormAnswer = this.fb.group({
      text: '',
      isRightAnswer: 0,
    });
    this.questions.at(questionIndex)?.controls?.answers?.push(newAnswer);
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    const answers = this.questions.at(questionIndex)?.controls?.answers;
    console.log(
      questionIndex,
      answerIndex,
      answers.at(answerIndex),
      answers.at(answerIndex).value,
    );
    //this.questions.at(questionIndex)?.controls?.answers?.removeAt(answerIndex);
    answers?.removeAt(answerIndex);
  }

  setRightAnswer(questionIndex: number, answerIndex: number): void {
    console.log(
      questionIndex,
      answerIndex,
      this.questions.at(questionIndex)?.controls?.answers.at(answerIndex),
    );
    const answers = this.questions.at(questionIndex).controls.answers;
    for (let answer of answers.controls) {
      answer.patchValue({ isRightAnswer: 0 });
    }
    answers.at(answerIndex).controls.isRightAnswer.setValue(1);
  }

  onSubmit() {
    console.log(this.quizForm.getRawValue());
  }
}
