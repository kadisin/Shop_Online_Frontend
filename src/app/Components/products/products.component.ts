import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/Services/navigation.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  view: 'grid' | 'list' = 'list';
  sortby: 'default' | 'htl' | 'lth' = 'default';
  products: Product[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      let category = params.category;
      let subcategory = params.subcategory;

      if(category && subcategory)
      {
        this.navigationService
        .getProducts(category, subcategory, 10)
        .subscribe((res: any) => {
          this.products = res;
        });
      }
    });
  }

  sortByPrice(sortkey: string) {
    this.products.sort((a,b) => {
      if(sortkey === 'default') {
        return a.id > b.id ? 1 : -1;
      }
      return (sortkey === 'htl' ? 1 : -1) *
        (this.utilityService.applyDiscount(a.price, a.offer.discount) >
        this.utilityService.applyDiscount(b.price, b.offer.discount)
        ? -1 : 1);
      
      return 0;
    });
  }
}
