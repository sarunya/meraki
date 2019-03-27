import { Component, OnInit } from '@angular/core';

import data  from '../../../assets/data/aboutus.json';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  teamMembers ;

  constructor() {
    this.teamMembers = data;
   }

  ngOnInit() {
  }

}
