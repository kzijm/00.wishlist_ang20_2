import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreasureListComponent } from './treasures/treasure-list/treasure-list.component';
import { WishesComponent } from './wishes/wishes.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { FormHomeComponent } from './dynamic-form/form-home.component';
import { DynamicFormSimpleComponent } from './dynamic-form-simple/dynamic-form-simple.component';
import { QuizFormComponent } from './dynamic-form-quiz/quizForm.component';

const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'wishes', title: 'Wishes', component: WishesComponent },
  { path: 'treasures', title: 'Treasures', component: TreasureListComponent },
  {
    path: 'treasures/user/:user',
    title: 'Treasures',
    component: TreasureListComponent,
  },
  {
    path: 'dynamic-forms',
    title: 'Dynamic Forms',
    component: FormHomeComponent,
  },
  {
    path: 'dynamic-form-simple',
    title: 'Dynamic Form Simple',
    component: DynamicFormSimpleComponent,
  },
  {
    path: 'dynamic-form-quiz',
    title: 'Dynamic Form Quiz',
    component: QuizFormComponent,
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
