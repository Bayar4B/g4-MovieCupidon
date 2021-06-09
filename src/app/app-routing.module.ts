import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { LobbyComponent } from './lobby';
import { MatchmakingComponent } from './matchmaking';
import { UserListComponent } from './user-list/user-list.component';
import { AuthentificationComponent } from './authentification/authentification.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'lobby/matchmaking', component: MatchmakingComponent },
  { path: 'authentification', component: AuthentificationComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: ''},
  {path: 'users', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
