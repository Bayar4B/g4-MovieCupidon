import { Component } from '@angular/core';

@Component({ templateUrl: 'lobby.component.html'})
export class LobbyComponent {
  typesOfFilms: string[] = ['Comedy', 'Sci-fi', 'Horror', 'Romance', 'Action', 'Thriller', 'Drama',
    'Mystery', 'Crime', 'Animation', 'Adventure', 'Fantasy', 'Comedy-romance', 'Action-comedy', 'Superhero']
}
