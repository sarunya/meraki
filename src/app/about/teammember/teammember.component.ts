import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-teammember',
  templateUrl: './teammember.component.html',
  styleUrls: ['./teammember.component.css']
})
export class TeammemberComponent implements OnInit {

  @Input() teamMember;
  
  constructor() { }

  ngOnInit() {
  }

}
