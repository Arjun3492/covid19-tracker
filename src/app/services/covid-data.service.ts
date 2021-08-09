import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class CovidDataService {
  private globalUrl =
  'https://corona.lmao.ninja/v2/countries?yesterday&sort';

  private countryUrl='https://corona.lmao.ninja/v2/countries/:query?yesterday=true&strict=true&query';

  private historyUrl='https://corona.lmao.ninja/v2/historical/:query?lastdays=10'


  constructor(private http: HttpClient) {
  }
  getGlobalInfo(){
    return this.http.get(this.globalUrl);
  }

  getCountryInfo(country: string){
   return this.http.get(this.countryUrl.replace(":query",country));
  }

  getHistoricData(country: string){
    return this.http.get(this.historyUrl.replace(":query",country));
  }
}
