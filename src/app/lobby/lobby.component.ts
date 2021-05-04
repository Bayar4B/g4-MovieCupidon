import { Component } from '@angular/core';

@Component({ templateUrl: 'lobby.component.html'})
export class LobbyComponent {
  public token = 'U1B6X';
  public index = 0;

  public genres = [
    {name: 'Comedy',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Comedy._CB1513316167_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Sci-fi',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Sci-Fi._CB1513316168_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Horror',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Horror._CB1513316168_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Romance',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Romance._CB1513316168_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Action',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Action._CB1513316166_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Thriller',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Thriller._CB1513316169_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Drama',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Drama._CB1513316168_SX233_CR0,0,233,131_AL_.jpg' },
    {name: 'Mystery',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Mystery._CB1513316168_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Crime',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Crime._CB1513316167_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Animation',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Animation._CB1513316167_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Adventure',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Adventure._CB1513316166_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Fantasy',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Fantasy._CB1513316168_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Comedy-romance',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Comedy-Romance._CB1513316167_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Action-comedy',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Action-Comedy._CB1513316166_SX233_CR0,0,233,131_AL_.jpg'},
    {name: 'Superhero',
      img: 'https://m.media-amazon.com/images/G/01/IMDb/genres/Superhero._CB1513316168_SX233_CR0,0,233,131_AL_.jpg'}
  ];

  constructor() { }

  /*removeUser(): void {
    this.homeServices.removePlayer();
  }*/
}
