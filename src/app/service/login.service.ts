import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private httpservice :HttpClient,
    private router: Router) { 

  }
//login
  getauthToken(username:string,password:string): Observable<any> {
    var obj ={
      username: username,
      password:password
    }
   return this.httpservice.post(environment.serverurl + '/auth/token',obj)
  }

  //logout user
  logout() {
    console.log('in logout')
    // clear auth for logout
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
