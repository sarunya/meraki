import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories;
  constructor() { }

  ngOnInit() {
    this.categories = [{
      image: "https://scontent-maa2-1.cdninstagram.com/vp/676f5e2d23591408c5ca4bdfd174bdd2/5D0F73A0/t51.2885-15/sh0.08/e35/c10.0.959.959/s640x640/52020943_413354702733028_6978514860606863309_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
      name: "cups",
      link: ""
    },{
      image: "https://scontent-maa2-1.cdninstagram.com/vp/676f5e2d23591408c5ca4bdfd174bdd2/5D0F73A0/t51.2885-15/sh0.08/e35/c10.0.959.959/s640x640/52020943_413354702733028_6978514860606863309_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
      name: "bowls",
      link: ""
    },{
      image: "https://scontent-maa2-1.cdninstagram.com/vp/676f5e2d23591408c5ca4bdfd174bdd2/5D0F73A0/t51.2885-15/sh0.08/e35/c10.0.959.959/s640x640/52020943_413354702733028_6978514860606863309_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
      name: "cases",
      link: ""
    },{
      image: "https://scontent-maa2-1.cdninstagram.com/vp/676f5e2d23591408c5ca4bdfd174bdd2/5D0F73A0/t51.2885-15/sh0.08/e35/c10.0.959.959/s640x640/52020943_413354702733028_6978514860606863309_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com",
      name: "cases2",
      link: ""
    }]
  }

}
