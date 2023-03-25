import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StoreComponent } from './components/store/store.component';
import { LibraryComponent } from './components/library/library.component';
import { OffersComponent } from './components/offers/offers.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { UserInterfaceComponent } from './components/user-interface/user-interface.component';
import { DevInterfaceComponent } from './components/dev-interface/dev-interface.component';
import { ManagerInterfaceComponent } from './components/manager-interface/manager-interface.component';
import { GameDetailsManagerComponent } from './components/game-details-manager/game-details-manager.component';
import { GamesManagerComponent } from './components/games-manager/games-manager.component';
import { HistoricoManagerComponent } from './components//historico-manager/historico-manager.component';
import { HeaderDevComponent } from './components/header-dev/header-dev.component';
import { FeedbackDevComponent } from './components/feedback-dev/feedback-dev.component';
import { HistoricoDevComponent } from './components/historico-dev/historico-dev.component';
import { GamesListDevComponent } from './components/games-list-dev/games-list-dev.component';
import { GamesDevComponent } from './components/games-dev/games-dev.component';
import { GameDetailsDevComponent } from './components/game-details-dev/game-details-dev.component';
import { GameDetailsExchangeComponent } from './components/game-details-exchange/game-details-exchange.component';
import { GamesExchangeComponent } from './components/games-exchange/games-exchange.component';
import { GamesLibraryComponent } from './components/games-library/games-library.component';
import { GameDetailsLibraryComponent } from './components/game-details-library/game-details-library.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StoreComponent,
    LibraryComponent,
    OffersComponent,
    ExchangeComponent,
    AccountComponent,
    LoginComponent,
    GamesComponent,
    GameDetailsComponent,
    UserInterfaceComponent,
    DevInterfaceComponent,
    ManagerInterfaceComponent,
    GameDetailsManagerComponent,
    GamesManagerComponent,
    HistoricoManagerComponent,
    HeaderDevComponent,
    FeedbackDevComponent,
    HistoricoDevComponent,
    GamesListDevComponent,
    GamesDevComponent,
    GameDetailsDevComponent,
    GameDetailsExchangeComponent,
    GamesExchangeComponent,
    GamesLibraryComponent,
    GameDetailsLibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
