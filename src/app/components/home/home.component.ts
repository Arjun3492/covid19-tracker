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
  cases: number[]=[];
  country: string[] = [];
  color: string[] = [];
  colorLight:string[] = [];

  constructor(private covidDataService: CovidDataService) {

    this.totalActive = 0;
    this.totalRecovered = 0;
    this.totalConfirmed = 0;
    this.totalDeaths = 0;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.covidDataService.getGlobalInfo().subscribe({
      next: (result: any) => {
        this.data = result;
        this.data.forEach((data) => {
          if(data.active>200000)
          {
            this.cases.push(data.active)
            this.country.push(data.country)
            this.color.push(RandomColor.generateColor())
            // console.log(this.color);
          }
          this.totalActive += data.active;
          this.totalDeaths += data.deaths;
          this.totalRecovered += data.recovered;
          this.totalConfirmed += data.cases;
        });
        this.color.forEach((color) => {
          this.colorLight.push(color.concat("60"))
          console.log(this.colorLight)
        }
        )
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {

        // chart implementation
        let barChart = new Chart("barChart", {
          type: 'bar',
          data: {
              labels: this.country,
              datasets: [{
                  label: 'Number of Cases',
                  data: this.cases,
                  backgroundColor: this.colorLight,
                  borderColor: this.color,
                  borderWidth: 1
              }]
          },
          options: {
            plugins: {
          },
              scales: {
                  y: {
                      beginAtZero: true,
                      display: true,
                    title: {
                      display: true,
                      text: 'CASES',
                      color: '#000',
                      font: {
                        size: 15,
                        weight: 'bold',
                        lineHeight: 1.2,
                      },}
                  },
                  x: {
                    display: true,
                    title: {
                      display: true,
                      text: 'COUNTRIES',
                      color: '#000',
                      font: {
                        size: 15,
                        weight: 'bold',
                        lineHeight: 1.2,
                      },}}
              }
          }
      });

      let pieChart = new Chart("pieChart", {
        type: 'pie',
        data: {
            labels: this.country,
            datasets: [{
                data: this.cases,
                backgroundColor: this.colorLight,
            }]
        },
        options: {
          plugins: {
            legend:{
              position:'right'
            }
        },

        }
    });
      },
    });
  }
}
