import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/Services/navigation.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  message = "";
  constructor(private fb: FormBuilder,
     private navigationService: NavigationService,
     private utilityService: UtilityService) {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15)
        ],
      ],
    });
  }
  login() {
     this.navigationService
     .loginUser(this.Email.value, this.PWD.value)
     .subscribe((res: any) => {
      if(res.toString() != 'invalid'){
        this.message = 'Logged In Successfully.';
        this.utilityService.setUser(res.toString());
        console.log(this.utilityService.getUser());
      }
      else {
        this.message = 'Invalid Crededntials!';
      }
     });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get PWD(): FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

}
