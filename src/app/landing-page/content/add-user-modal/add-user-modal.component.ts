import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Users } from 'src/app/models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CrudService } from 'src/app/service/crud.service';
import { isNullOrUndefined } from 'util';
import { Flights } from 'src/app/models/flights';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  userForm: FormGroup;
  genders: string[];
  userObject: Users;
  configurl: string;
  isuser= false;
  flighttype: string[];
  flightForm: FormGroup;
  flightObject: Flights;


  constructor(
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private httpservice: HttpClient,
    private crudservice: CrudService) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.configurl = '/users/';
  }

  ngOnInit(): void {
    console.log("modal", this.data)
    if(this.data === 'user'){
      this.isuser = true;
    }
    this.genders = [
      'male',
      'female'
    ]
    this.flighttype = [
      'domestic',
      'international'
    ];
    this.createformbuilder();
    if (!isNullOrUndefined(this.data)) {
      this.patchValues();
    }
  }
  createformbuilder() {
    if(this.isuser){
      this.userForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        gender: ['', [Validators.required]],
        designation: [2]
      });
      this.userForm.get('designation').disable();
    } else {
   
      this.flightForm = this.fb.group(
        { id: [''],
          name:['',Validators.required],
          origin:['',Validators.required],
          destination:['',Validators.required],
          fare:['',Validators.required],
          type:['',Validators.required],
        }
      )
    }
  
  }

  onAdd(form) {
    if(this.isuser) {
      this.userObject = {
        _id: form.value.id,
        name: form.value.name,
        username: form.value.username,
        password: form.value.password,
        gender: form.value.gender,
        designation: 2
      }
      this.userForm.get('id').value != '' ? this.updateUser(this.userObject) : this.addUser(this.userObject);  
    } else {
      this.flightObject = {
        _id: form.value.id,
        name: form.value.name,
        origin: form.value.origin,
        destination: form.value.destination,
        fare: form.value.fare,
        type: form.value.type,
      }
      console.log( this.flightForm.get('id').value)
   
      this.flightForm.get('id').value != ''  && !isNullOrUndefined(this.flightForm.get('id').value)
       ? this.updateFlight(this.flightObject) :  this.addFlight(this.flightObject);  

     
    }
    this.dialogRef.close();
  }


  // calling services

  addUser(userObject: Users) {   
    this.crudservice.add(userObject,this.configurl);
  }

  updateUser(userObject: Users) {
   this.crudservice.update(userObject,this.configurl);
  }

  addFlight(flightObject: Flights){
    this.crudservice.add(flightObject,'/flights/');
  }
  
  updateFlight(flightObject: Flights){
    this.crudservice.update(flightObject,'/flights/');
  }

  patchValues() {
   if(this.isuser){
    this.userForm.patchValue(
      {
        id: this.data._id,
        name: this.data.name,
        username: this.data.username,
        password: this.data.password,
        designation: this.data.designation,
        gender: this.data.gender
      } 
    )
   } else {
    this.flightForm.patchValue(
      {
        id: this.data._id,
        name: this.data.name,
        origin: this.data.origin,
        destination: this.data.destination,
        fare: this.data.fare,
        type: this.data.type
      }
    );
}
   
  }

}
