import { Component, ElementRef, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Category, NavigationItem } from '../models/models';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NavigationService } from 'src/app/Services/navigation.service';
import { UtilityService } from 'src/app/Services/utility.service';

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

  constructor(private navigationService: NavigationService,
    public utilityService: UtilityService) {}

  ngOnInit(): void {
     // Get Category List
     this.navigationService.getCategoryList().subscribe((list: Category[]) => {
      for (let item of list) {
        let present = false;
        for (let navItem of this.navigationList) {
          if (navItem.category === item.category) {
            navItem.subcategories.push(item.subCategory);
            present = true;
          }
        }
        if (!present) {
          this.navigationList.push({
            category: item.category,
            subcategories: [item.subCategory],
          });
        }
      }
    });

  }

  openModal(name: string) {
    this.container.clear();
    let componentType!: Type<any>;
    if(name === 'login')
    {
      componentType = LoginComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Login Information';
    } 
    if(name === 'register')
    {
      componentType = RegisterComponent;
      this.modalTitle.nativeElement.textContent = 'Enter Register Information';
    } 
    this.container.createComponent(componentType);
  }

}
