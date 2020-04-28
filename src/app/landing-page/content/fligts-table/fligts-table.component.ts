import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'src/app/service/crud.service';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Flights } from './../../../models/flights'
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-fligts-table',
  templateUrl: './fligts-table.component.html',
  styleUrls: ['./fligts-table.component.scss']
})
export class FligtsTableComponent implements OnInit {
  flightRes: any = [];
 configurl = '/flights/'
  dialogres: any;
  constructor(  private httpservice :HttpClient,
    private crudservice : CrudService,
    private authservice : AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFlights() 
  }

  
  getFlights() {
    console.log("get flights")
    this.httpservice.get(environment.serverurl + '/flights', 
     { headers: this.crudservice.makeheaders() }).subscribe(
      res=>{
        console.log(typeof(res))
        this.flightRes = res;
     console.log(this.flightRes.length)
      },
      error =>{
          error.status == 401? this.authservice.tokenEXpired():null;
      }
    ) 
  }

  deleteRow(element){
    console.log("delete clicked", element)
    this.crudservice.delete(element._id ,this.configurl);
    this.getFlights();
  }

  addFlight(){
    console.log("add flight")
    const dialogRef = this.dialog.open(AddUserModalComponent, {
      width: '400px',
     data: 'flight'
    });
 
   dialogRef.afterClosed().subscribe(result => {
     this.getFlights();
     console.log('The dialog was closed');
     this.dialogres = result;
   });
  }
  
   
 updateFlight(flight){
  const dialogRef = this.dialog.open(AddUserModalComponent, {
    width: '400px',
    data: flight
  });

 dialogRef.afterClosed().subscribe(result => {
   this.getFlights();
   console.log('The dialog was closed');
   this.dialogres = result;
 });
 }
  
  
}
