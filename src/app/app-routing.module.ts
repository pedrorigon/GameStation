import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { LibraryComponent } from './components/library/library.component';

const routes: Routes = [
  { path: 'store', component: StoreComponent },
  { path: 'library', component: LibraryComponent },
  { path: '', redirectTo: '/store', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
