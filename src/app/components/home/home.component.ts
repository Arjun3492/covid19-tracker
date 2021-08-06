import { dataSummary } from './../../models/data';
import { Component, OnInit } from '@angular/core';
import { CovidDataService } from 'src/app/services/covid-data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  observer:any
  constructor(private covidDataService: CovidDataService) { }
  ngOnInit(): void {
    this.getData();
  }
  getData(){
      this.covidDataService.getInfo().subscribe({
        next: (data: any) => {console.log(data)},
        error: (error: any) => {console.log(error)},
        complete: () => {console.log('complete')}
      }
      )
}}
