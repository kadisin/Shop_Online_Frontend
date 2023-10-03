import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from 'src/app/Services/navigation.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Product } from '../models/models';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  imageIndex: number= 1;
  product!: Product;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private navigationService: NavigationService,
    public utilityService: UtilityService
  ) {}

  ngOnInit(): void {
     this.activatedRoute.queryParams.subscribe((params: any) => {
      let id = params.id;
      this.navigationService.getProduct(id).subscribe((res: any) => {
        this.product = res;
      });
     });
  }
}
