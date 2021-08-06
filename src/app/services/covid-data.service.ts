import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { dataSummary } from '../models/data';

@Injectable({
  providedIn: 'root',
})
export class CovidDataService {
  private covidData =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-04-2021.csv';

  constructor(private http: HttpClient) {}

  getInfo() {
    return this.http.get(this.covidData, { responseType: 'text' }).pipe(
      map((result) => {
        var data: dataSummary[] = [];
        var row = result.split('\n').slice(1);
        var mergedCountryData: dataSummary[] = [];
        row.forEach((row) => {
          let colElement = row.split(/,(?!\s)/);
          data.push({
            country: colElement[3],
            confirmed: +colElement[7],
            deaths: +colElement[8],
            recovered: +colElement[9],
            active: +colElement[10],
          });
        });
        console.log(data[0]);
        var preCountry: dataSummary = data[0];
        // for (var i = 1; i < data.length; i++) {
        //   if (preCountry.country == data[i].country) {
        //     preCountry.confirmed += data[i].confirmed;
        //     preCountry.deaths += data[i].deaths;
        //     preCountry.recovered += data[i].recovered;
        //     preCountry.active += data[i].active;
        //   } else {
        //     mergedCountryData.push(preCountry);
        //     preCountry = data[i];
        //   }
        // }

        // data.forEach(data =>{
        // if(preCountry.country==data.country){
        //   preCountry.confirmed +=  data.confirmed;
        //   preCountry.deaths +=  data.deaths;
        //   preCountry.recovered += data.recovered; ;
        //   preCountry.active += data.active;

        // }else{
        //   mergedCountryData.push(preCountry);
        //   preCountry=data;
        // }
        // }
        // )
      })
    );
  }
}
