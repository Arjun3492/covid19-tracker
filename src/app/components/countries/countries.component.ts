import { Component, OnInit } from '@angular/core';
import { dataSummary } from 'src/app/models/data';
import { CovidDataService } from 'src/app/services/covid-data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  data:dataSummary[] =[];
  countries:string[] =[];
  defaultCountry:string="";
  countryData:dataSummary;
  totalConfirmed: number;
  totalRecovered: number;
  totalActive: number;
  totalDeaths: number;

  constructor( private covidDataService: CovidDataService) {
    this.totalActive = 0;
    this.totalRecovered = 0;
    this.totalConfirmed = 0;
    this.totalDeaths = 0;
  }

  ngOnInit(): void {
    this.getCountries();
  }
  getCountries(){
    this.covidDataService.getGlobalInfo().subscribe({
      next: (result: any) => {
        this.data = result;
        this.defaultCountry=this.data[0].country;
        this.defaultValue();
        this.data.forEach((data) => {
          this.countries.push(data.country);
          // console.log(data.country);
        });
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },

    });
  }
  defaultValue(){
    this.covidDataService.getCountryInfo(this.defaultCountry).subscribe({
      next: (result: any) => {
        console.log(this.defaultCountry)
        this.countryData = result;
          this.totalConfirmed=this.countryData.cases;
          this.totalRecovered=this.countryData.recovered;
          this.totalDeaths=this.countryData.deaths;
          this.totalActive=this.countryData.active;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });

  }

  updateValue(country: string){
    this.covidDataService.getCountryInfo(country).subscribe({
      next: (result: any) => {
        this.countryData = result;
          this.totalConfirmed=this.countryData.cases;
          this.totalRecovered=this.countryData.recovered;
          this.totalDeaths=this.countryData.deaths;
          this.totalActive=this.countryData.active;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
      },
    });

  }
}
