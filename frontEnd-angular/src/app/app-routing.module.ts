import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { LibraryComponent } from './components/library/library.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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
import { GamesListDevComponent } from './components/games-list-dev/games-list-dev.component';
import { GamesDevComponent } from './components/games-dev/games-dev.component';
import { GameDetailsDevComponent } from './components/game-details-dev/game-details-dev.component';
import { GameDetailsExchangeComponent } from './components/game-details-exchange/game-details-exchange.component';
import { GamesExchangeComponent } from './components/games-exchange/games-exchange.component';
import { GamesLibraryComponent } from './components/games-library/games-library.component';
import { GameDetailsLibraryComponent } from './components/game-details-library/game-details-library.component';
import { HeaderManagerComponent } from './components/header-manager/header-manager.component';
import { GamesOfferComponent } from './components/games-offer/games-offer.component';
import { GameDetailsOfferComponent } from './components/game-details-offer/game-details-offer.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'store', component: StoreComponent },
  { path: 'store/:id', component: StoreComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'offers/:id', component: OffersComponent },
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
  { path: 'games-list-dev', component: GamesListDevComponent },
  { path: 'games-dev', component: GamesDevComponent },
  { path: 'game-details-offer/:id', component: GameDetailsOfferComponent },
  { path: 'games-offer', component: GamesOfferComponent },
  { path: 'game-details-dev/:id', component: GameDetailsDevComponent },
  { path: 'games-exchange', component: GamesExchangeComponent },
  { path: 'game-details-exchange/:id', component: GameDetailsExchangeComponent },
  { path: 'games-library', component: GamesLibraryComponent },
  { path: 'game-details-library/:id', component: GameDetailsLibraryComponent },
  { path: 'header-manager', component: HeaderManagerComponent },
  { path: 'historico-manager', component: HistoricoManagerComponent },
  { path: '', redirectTo: 'dev-interface', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
