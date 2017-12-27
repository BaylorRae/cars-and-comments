import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface Car {
  id: string
  imageUrl: string
  name: string
  make: string
  model: string
  year: number
}

const AllCarsQuery = gql`
  query allCars {
    allCars {
      id
      name
      imageUrl
      make
      model
      year
    }
  }
`;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  loading = true;
  cars: Car[];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.watchQuery<any>({
        query: AllCarsQuery
      })
      .valueChanges
      .subscribe(({ data }) => {
        this.loading = data.loading;
        this.cars = data.allCars;
      });
  }

}
