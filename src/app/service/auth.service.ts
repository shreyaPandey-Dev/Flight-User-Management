import { Injectable } from '@angular/core';
import { isNull, isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { 

  }


  isAuthenticated() {
   return !isNullOrUndefined(localStorage.getItem("credentials"))
  }

  tokenEXpired()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
