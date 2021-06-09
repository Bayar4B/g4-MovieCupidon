import { Movie } from '../models/Movie.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MovieService {
  private movies: Movie[] = [];
  moviesSubject = new Subject<Movie[]>();

  emitMovies(): void {
    this.moviesSubject.next(this.movies);
  }

  addMovie(movie: Movie): void {
    this.movies.push(movie);
    this.emitMovies();
  }
}
