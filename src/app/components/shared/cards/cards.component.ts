import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input('totalConfirmed') totalConfirmed: any;
  @Input('totalDeaths')  totalDeaths:any;
  @Input('totalActive') totalActive:any;
  @Input('totalRecovered')  totalRecovered:any;


  constructor() {

   }

  ngOnInit(): void {
  }

}
