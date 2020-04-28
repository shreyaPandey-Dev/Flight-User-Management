import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
}) 
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  constructor(private router: Router,
    private loginservice: LoginService) {
    this.loginForm = new FormGroup({ 
      email: new FormControl('', [Validators.required]), //Validators.email
      password: new FormControl('', [Validators.required])
    });
  }


  
  ngOnInit(): void {
  }

  login() {
    this.loginservice.getauthToken(this.loginForm.get('email').value,
    this.loginForm.get('password').value).subscribe(
      res=>{
        console.log("auth=",res)
        localStorage.setItem('credentials',JSON.stringify(res))
        this.router.navigate(['/']);
      },
      error => {
        console.error(error)
      }
    )
   


  }
}
