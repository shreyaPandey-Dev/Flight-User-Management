import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isuser: boolean = false;

  constructor() { }

  ngOnInit(): void {
    var credential = JSON.parse(localStorage.getItem('credentials'));
    console.log("KEY--------------------------------",
    credential['roleid'] )
    
  this.isuser =  credential['roleid'] == 2 ;

  }

}
