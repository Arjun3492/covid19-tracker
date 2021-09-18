import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { dataSummary } from 'src/app/models/data';
import { HDSummary } from 'src/app/models/historicData';
import { CovidDataService } from 'src/app/services/covid-data.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  data: dataSummary[] = [];
  countries: string[] = [];
  defaultCountry: string = "";
  historicData!: HDSummary;
  countryData!: dataSummary;
  totalConfirmed: number;
  totalRecovered: number;
  totalActive: number;
  totalDeaths: number;
  cases: object = {};
  deaths: object = {};
  recovered: object = {};
  lineChart: any;
  call: number = 0;
  @ViewChild('c') radioButton!: ElementRef;



  constructor(private covidDataService: CovidDataService,) {

    this.totalActive = 0;
    this.totalRecovered = 0;
    this.totalConfirmed = 0;
    this.totalDeaths = 0
  }

  ngOnInit(): void {
    this.getCountries();
  }
  getCountries() {
    this.covidDataService.getGlobalInfo().subscribe({
      next: (result: any) => {
        this.data = result;
        this.defaultCountry = this.data[0].country;
        this.data.forEach((data) => {
          this.countries.push(data.country);
        });
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
        this.updateValue(this.defaultCountry);
      },
    });
  }


  updateValue(country: string) {
    this.covidDataService.getCountryInfo(country).subscribe({
      next: (result: any) => {
        this.countryData = result;
        this.totalConfirmed = this.countryData.cases;
        this.totalRecovered = this.countryData.recovered;
        this.totalDeaths = this.countryData.deaths;
        this.totalActive = this.countryData.active;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.updateHistoricalData(country);
      },
    });
  }

  updateHistoricalData(country: string,) {
    this.covidDataService.getHistoricData(country).subscribe({
      next: (result: any) => {
        this.historicData = result;
        this.radioButton.nativeElement.checked = true;
        this.updateTable('c')
      }
    })
  }
  updateTable(caseType: string) {
    this.cases = {};
    if (caseType == 'c') {
      this.cases = this.historicData.timeline.cases;
    }
    if (caseType == 'd') {
      this.cases = this.historicData.timeline.deaths;
    }
    if (this.call > 0) {
      this.lineChart.destroy();
    }
    this.call++;
    this.updateChart(this.cases);
  }

  updateChart(cases: object) {
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: Object.keys(this.historicData.timeline.cases),
        datasets: [{
          label: 'My First Dataset',
          data: Object.values(cases),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]

      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
