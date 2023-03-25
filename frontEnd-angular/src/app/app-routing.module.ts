import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { LibraryComponent } from './components/library/library.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { OffersComponent } from './components/offers/offers.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { ManagerInterfaceComponent } from './components/manager-interface/manager-interface.component';
import { GameDetailsManagerComponent } from './components/game-details-manager/game-details-manager.component';
import { GamesManagerComponent } from './components/games-manager/games-manager.component';
import { HistoricoManagerComponent } from './components//historico-manager/historico-manager.component';
import { HeaderDevComponent } from './components/header-dev/header-dev.component';
import { UserInterfaceComponent } from './components/user-interface/user-interface.component';
import { DevInterfaceComponent } from './components/dev-interface/dev-interface.component';
import { FeedbackDevComponent } from './components/feedback-dev/feedback-dev.component';
import { HistoricoDevComponent } from './components/historico-dev/historico-dev.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'store', component: StoreComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'library/:id', component: GameDetailsComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'games', component: GamesComponent },
  { path: 'game-details/:id', component: GameDetailsComponent },
  { path: 'manager-interface', component: ManagerInterfaceComponent },
  { path: 'games-manager', component: GamesManagerComponent },
  { path: 'game-details-manager/:id', component: GameDetailsManagerComponent },
  { path: 'dev-interface', component: DevInterfaceComponent },
  { path: 'header-dev', component: HeaderDevComponent },
  { path: 'user-interface', component: UserInterfaceComponent },
  { path: 'feedback-dev', component: FeedbackDevComponent },
  { path: 'historico-dev', component: HistoricoDevComponent },
  { path: '', redirectTo: 'dev-interface', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
