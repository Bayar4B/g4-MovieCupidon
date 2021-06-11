import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../models/Movie.model';
import { Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({templateUrl: 'matchmaking.component.html'})

export class MatchmakingComponent implements OnInit, OnDestroy {
  score = 0;
  movies: Movie[];
  movieSubscription: Subscription;
  index = 0;
  interval: number;
  state = 'voting';
  resultIndex: number;
  checker: boolean;

  // URL pour play service
  scoreURL = 'https://movie.graved.ch/api/play/v1/play/send';
  finishURL = 'https://movie.graved.ch/api/play/v1/play/checkAllFinished';
  // URL pour lobby service
  endGameURL = 'https://movie.graved.ch/api/lobby/v1/lobby/endGameDeletion';

  constructor(private movieService: MovieService,
              private http: HttpClient,
              private router: Router) { }

  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }

  async ngOnInit(): Promise<void> {
    this.movieSubscription = this.movieService.moviesSubject.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      }
    );
    this.movieService.emitMovies();
    this.interval = setInterval(async () => {
      // this.checkAllFinished();
      // if ( this.checker ) {
      //   console.log('checker fk',this.checker);
      //   this.resultIndex = this.getResult();
      //   this.state = 'finish';
      // }
      await this.checkAllFinished().then( async (checker) =>{
        if(checker){
          console.log('checker fk',checker);
          // this.resultIndex = this.getResult();
          await this.getResult().then( async (res) => {
            this.resultIndex = res
          });
          this.state = 'finish';
          clearInterval(this.interval);
        }
      });
    }, 5000);
  }

  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
    clearInterval(this.interval);
  }

  // sendScore(index, score): void {
  //   this.http.post(`${this.scoreURL}/${index}/${score}`, null).subscribe(
  //     (result) => {
  //       console.log(result);
  //     });
  //   if (this.index < 19) {
  //     this.index++;
  //   }
  //   else {
  //     this.state = 'waiting';
  //   }
  // }
  sendScore(index, score): void {
    fetch(`${this.scoreURL}/${index}/${score}`, {
      method: 'POST',
      headers: {
        'X-User': '10x'
      },
      body: String(null)
    })
      .then(() => {
        if (this.index < 19) {
          this.index++;
        }
        else {
          this.state = 'waiting';
        }
      });
  }
  
  async checkAllFinished(): Promise<boolean> {
    const req = await fetch('https://movie.graved.ch/api/play/v1/play/checkAllFinish', {
      method: 'GET',
      headers: {
        'X-User': '10x'
      }
    });
    const res = await req.json();
    console.log('resfk',res.fin);
    return await res.fin;
  }

  async getResult(): Promise<number> {
    const req = await fetch('https://movie.graved.ch/api/play/v1/play/getResult', {
      method: 'GET',
      headers: {
        'X-User': '10x'
      }
    });
    const res = await req.json();
    return await res.id;
  }

  // endGame(): void {
  //   this.http.delete(this.endGameURL)
  //     .subscribe(
  //       (result) => {
  //         console.log(result);
  //       });
  // }
  endGame(): void {
    fetch( 'https://movie.graved.ch/api/lobby/v1/lobby/endGameDeletion', {
      method: 'DELETE',
      headers: {
        'X-User': '10x'
      }
    }).then(req => req.json())
      .then(res => {
        console.log(res);

      })
      .catch(err => {
        console.log('err', err);
      });
  } 

}




