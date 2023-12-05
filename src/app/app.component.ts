import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'Interceptors_melvin';

  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(
      (response) => {
        // On successful response, assign the data to the component property
        this.data = response;
      },
      (error) => {
        // Error handling can be done here if needed
        console.error('Error:', error);
      }
    );
  }
}
