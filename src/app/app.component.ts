import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from './API.service';
import { Restaurant } from '../types/restaurant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'amplify-angular-app';
  public createForm: FormGroup;

  /* declare restaurants variable */
  restaurants: Array<Restaurant>;

  constructor(private api: APIService, private fb: FormBuilder) { }

  async ngOnInit() {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'city': ['', Validators.required]
    });
    this.api.ListTodos().then(event => {
      this.restaurants = event.items;
    });
  
    /* subscribe to new restaurants being created */
    this.api.OnCreateTodoListener.subscribe( (event: any) => {
      const newRestaurant = event.value.data.onCreateRestaurant;
      this.restaurants = [newRestaurant, ...this.restaurants];
    });
  }

  public onCreate(restaurant: Restaurant) {
    this.api.CreateTodo(restaurant).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }
  public refresh() : void {
    console.log("==========s")
    window.location.reload();
  }
}