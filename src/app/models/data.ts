export interface dataSummary{
  country:string;
  cases:number;
  todayCases:number;
  countryInfo: {
    _id: number;
    iso3: string;
    lat: number,
    long: number,
    flag: string,
    },
  active:number;
  recovered:number;
  todayRecovered:number;
  deaths:number;
  todayDeaths:number;
}
