import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-image',
  templateUrl: './display-image.component.html',
  styleUrls: ['./display-image.component.css']
})
export class DisplayImageComponent implements OnInit {
  // title = 'Meraki';
  // menuOptions = [1, 2, 3];

  slideIndex = 1;

  ngOnInit() {
    this.showDivs(1);
  }

  public showDivs(n:number) {
    var i : number;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    if (n > x.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
      (<HTMLInputElement>x[i]).style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-white", "");
    }
    (<HTMLInputElement>x[this.slideIndex - 1]).style.display = "block";
    dots[this.slideIndex - 1].className += " w3-white";
  }

  public plusDivs(n:number) {
    this.showDivs(this.slideIndex += n);
  }

  public currentDiv(n:number) {
    this.showDivs(this.slideIndex = n);
  }

  public automaticSlideshow() {

  }
}

