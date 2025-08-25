import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreasureListComponent } from './treasures/treasure-list/treasure-list.component';
import { WishesComponent } from './wishes/wishes.component';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'wishes', title: 'Wishes', component: WishesComponent },
  { path: 'treasures', title: 'Treasures', component: TreasureListComponent },
  {
    path: 'treasures/user/:user',
    title: 'Treasures',
    component: TreasureListComponent,
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
