import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Users } from '../models/users';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // configUrl = '/users';

  constructor(  private httpservice: HttpClient) { }

  makeheaders(){
    var token =JSON.parse( localStorage.getItem("credentials"))["accessToken"];
    // debugger
    return new HttpHeaders().set(
          'Authorization',
          'Bearer ' + token
        );
     
  }

  //pass url, object
  add(objectTosend: any, configUrl){
    return this.httpservice.post(environment.serverurl + configUrl, objectTosend,
    { headers: this.makeheaders() } 

  ).subscribe(
    res => {
      return console.log('successfully added');
    },
    error =>
      console.log('not added')
  );
  }

 
  update(objectTosend: any, configUrl){
    if (!isNullOrUndefined(objectTosend)) {
    return  this.httpservice.put(environment.serverurl + configUrl + objectTosend._id,
      objectTosend,
        { headers: this.makeheaders() }).subscribe(
          res =>
            console.log('successfully updated'),

          error =>
            console.log('not updated')

        );
    }
  }
  delete(id, configUrl){
    return  this.httpservice.delete(environment.serverurl + configUrl + id,
     
        { headers: this.makeheaders() }).subscribe(
          res =>
            console.log('successfully deleted'),

          error =>
            console.log('not deleted')

        );
  }


  
}
