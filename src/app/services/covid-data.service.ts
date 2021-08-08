import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class CovidDataService {
  private GlobalUrl =
  'https://corona.lmao.ninja/v2/countries?yesterday&sort';

  private CountryUrl='https://corona.lmao.ninja/v2/countries/item?yesterday=true&strict=true&query'


  constructor(private http: HttpClient) {
  }
  getGlobalInfo(){
    return this.http.get(this.GlobalUrl);
  }

  getCountryInfo(country: string){
   return this.http.get(this.CountryUrl.replace("item",country));
  }
}
