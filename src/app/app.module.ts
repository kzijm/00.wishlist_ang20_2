import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WishListComponent } from './wishes/wish-list/wish-list.component';
import { AddWishComponent } from './wishes/add-wish/add-wish.component';
import { WishFilterComponent } from './wishes/wish-filter/wish-filter.component';
import { WishListItemComponent } from './wishes/wish-list-item/wish-list-item.component';
import { provideHttpClient } from '@angular/common/http';
import { TreasureListComponent } from './treasures/treasure-list/treasure-list.component';
import { WishesComponent } from './wishes/wishes.component';
import { TreasuresComponent } from './treasures/treasures.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    WishListComponent,
    AddWishComponent,
    WishFilterComponent,
    WishListItemComponent,
    TreasureListComponent,
    WishesComponent,
    TreasuresComponent,
    NotfoundComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
