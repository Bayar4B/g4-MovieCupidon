import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-formulaire-join',
  templateUrl: './formulaire-join.component.html'
})
export class FormulaireJoinComponent implements OnInit {

  @Input() public state;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
