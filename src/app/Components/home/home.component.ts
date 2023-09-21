import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  suggestedProducts: SuggestedProduct[] = [
    {
      banerimage: 'Baner/Baner_Laptop.jpg',
      category: {
        id: 1,
        category: 'electornics',
        subcategory: 'laptops',
      },
    },
    {
      banerimage: 'Baner/Baner_Chair.jpg',
      category: {
        id: 1,
        category: 'furniture',
        subcategory: 'chairs',
      },
    },
    {
      banerimage: 'Baner/Baner_Table.jpg',
      category: {
        id: 1,
        category: 'furniture',
        subcategory: 'table',
      },
    },
    {
      banerimage: 'Baner/Baner_Mobile.jpg',
      category: {
        id: 1,
        category: 'electornics',
        subcategory: 'mobile',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {
    
  }

}
