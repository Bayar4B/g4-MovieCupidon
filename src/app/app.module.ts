import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from './home';
import {LobbyComponent} from './lobby';
import {MatchmakingComponent} from './matchmaking';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbyComponent,
    MatchmakingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
