import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

interface Car {
  id: string
  name: string
  imageUrl: string
  make: string
  model: string
  year: number
}

interface Comment {
  id: string
  body: string
  author: string
}

const CarAndCommentsQuery = gql`
  query ($carId: ID!) {
    car: Car(id: $carId) {
      id
      name
      imageUrl
      make
      model
      year
    }

    comments: allComments(filter: { car: { id: $carId } }) {
      id
      body
      author
    }
  }
`;

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  loading = true;
  car: Car;
  comments: Comment[];

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apollo.watchQuery<any>({
          query: CarAndCommentsQuery,
          variables: {
            carId: params.id
          }
        })
        .valueChanges
        .subscribe(({data}) => {
          this.loading = data.loading;
          this.car = data.car;
          this.comments = data.comments;
        });
    });
  }

}
