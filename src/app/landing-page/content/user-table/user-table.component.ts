import { Component, OnInit } from '@angular/core';
import { Users } from '../../../models/users';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/service/crud.service';
import { AuthService } from 'src/app/service/auth.service';
import {SelectionModel} from '@angular/cdk/collections';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  userRes:any  = [];
  clickedrow: Users;
  dialogres: any;
  configurl: string;
  displayedColumns = ['checked', 'name','username', 'gender', 'designation'];
  dataSource: MatTableDataSource<any>;
  
  constructor(
    private httpservice :HttpClient,
    private crudservice : CrudService,
    private authservice : AuthService,
    public dialog: MatDialog,
    public selection: SelectionModel<Users>
  ) { }

  ngOnInit(): void {
    this.getUsers();
    console.log( this.clickedrow )
    this.configurl = '/users/';
    const allowMultiSelect = false;
    const initialSelection = [];
    this.selection = new SelectionModel<Users>(allowMultiSelect, initialSelection);

  }


  highlight(element: Users) {
    element.highlighted = !element.highlighted;
   this.clickedrow = element;
   //handle for more than one
   console.log("hight",this.clickedrow)
  }
 
  getUsers() {
    this.httpservice.get(environment.serverurl + '/users', 
     { headers: this.crudservice.makeheaders() }).subscribe(
      res=>{
        console.log(typeof(res))
        this.userRes = res;
        // this.dataSource = res;
        this.dataSource = new MatTableDataSource(this.userRes);

      },
      error =>{
          error.status == 401? this.authservice.tokenEXpired():null;
      }
    ) 
  }

 addUser(){
  console.log("add",this.clickedrow)
   const dialogRef = this.dialog.open(AddUserModalComponent, {
     width: '400px',
     data: 'user'  
   });

  dialogRef.afterClosed().subscribe(result => {
    this.getUsers();
    console.log('The dialog was closed');
    this.dialogres = result;
  });

 }
  
 updateUser(){
  const dialogRef = this.dialog.open(AddUserModalComponent, {
    width: '400px',
    data: this.clickedrow
  });

 dialogRef.afterClosed().subscribe(result => {
   this.getUsers();
   console.log('The dialog was closed');
   this.dialogres = result;
 });
 }
  
 deleteUser(){
  this.crudservice.delete(this.clickedrow._id ,this.configurl);
  this.getUsers();
}


 doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}

