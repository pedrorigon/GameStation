import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { LibraryComponent } from './components/library/library.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  { path: 'store', component: StoreComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: ' ', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
