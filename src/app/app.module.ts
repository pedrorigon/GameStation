import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreComponent } from './components/store/store.component';
import { LibraryComponent } from './components/library/library.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StoreComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
