import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationItem } from '../models/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modalTitle') modalTitle!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef, static: true})
  container!: ViewContainerRef;
   
  navigationList: NavigationItem[] = [
    {
      category: "electronics",
      subcategories: ["mobiles", "laptops"]
    },
    {
      category: "furniture",
      subcategories: ["chairs", "tables"]
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }

  openModal(name: string) {
    this.container.clear();
  }

}
