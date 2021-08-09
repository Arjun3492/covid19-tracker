import { Component, OnInit } from '@angular/core';
import { dataSummary } from 'src/app/models/data';
import { CovidDataService } from 'src/app/services/covid-data.service';
import Chart from 'chart.js/auto';
import { RandomColor } from 'angular-randomcolor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: dataSummary[] = [];
  totalConfirmed: number;
  totalRecovered: number;
  totalActive: number;
  totalDeaths: number;
  cases: number[] = [];
  country: string[] = [];
  color: string[] = [];
  colorLight: string[] = [];
  casesType: string = '';
   barChart:any;
   pieChart:any;

  constructor(private covidDataService: CovidDataService) {
    this.totalActive = 0;
    this.totalRecovered = 0;
    this.totalConfirmed = 0;
    this.totalDeaths = 0;
  }

  ngOnInit(): void {
    this.casesType = 'c';
    this.getData();
    this.updateChart('c')
  }

  getData() {
    this.covidDataService.getGlobalInfo().subscribe({
      next: (result: any) => {
        this.data = result;
        this.data.forEach((data) => {

          this.totalActive += data.active;
          this.totalDeaths += data.deaths;
          this.totalRecovered += data.recovered;
          this.totalConfirmed += data.cases;
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

  updateChart(casesType: string){
    this.covidDataService.getGlobalInfo().subscribe({
      next: (result: any) => {
        result.forEach((data: any) => {
          if (casesType == 'c') {
          if (data.cases > 2000000) {
            this.cases.push(data.cases);
            this.country.push(data.country);
            this.color.push(RandomColor.generateColor());
          }
        }
        if (casesType == 'a') {
          if (data.active > 200000) {
            this.cases.push(data.active);
            this.country.push(data.country);
            this.color.push(RandomColor.generateColor());
          }
        }
        if (casesType == 'd') {
          if (data.deaths > 100000) {
            this.cases.push(data.deaths);
            this.country.push(data.country);
            this.color.push(RandomColor.generateColor());
          }
        }
        if (casesType == 'r') {
          if (data.recovered >3000000) {
            this.cases.push(data.recovered);
            this.country.push(data.country);
            this.color.push(RandomColor.generateColor());
          }
        }


      })
      this.color.forEach((color) => {
        this.colorLight.push(color.concat('60'));
      });

      },
      complete:()=>{
          // chart implementation

          this.barChart = new Chart('barChart', {
            type: 'bar',
            data: {
              labels: this.country,
              datasets: [
                {
                  label: 'Number of Cases',
                  data: this.cases,
                  backgroundColor: this.colorLight,
                  borderColor: this.color,
                  borderWidth: 1,
                },
              ],
            },
          });

          this.pieChart = new Chart('pieChart', {
            type: 'pie',
            data: {
              labels: this.country,
              datasets: [
                {
                  data: this.cases,
                  backgroundColor: this.colorLight,
                  borderColor: 'gray',
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  position: 'right',
                },
              },
            },
          });

      }


    })
  }

  updateValue(casesType: string) {
    this.cases = [];
    this.country=[];
    this.color=[];
    this.colorLight=[];
    this.barChart.destroy();
    this.pieChart.destroy();
    this.updateChart(casesType);
  }


}
