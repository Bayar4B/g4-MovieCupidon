import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formulaire-join',
  templateUrl: './formulaire-join.component.html'
})
export class FormulaireJoinComponent implements OnInit {

  @Input() public state;

  constructor() { }

  ngOnInit(): void {
  }

}
