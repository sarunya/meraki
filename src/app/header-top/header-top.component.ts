import { Component, OnInit, NgZone } from '@angular/core';

declare const gapi;
@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent implements OnInit {
  userImageUrl:any;
  signIn: any = false;
  constructor(ngZone:NgZone) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));

    window['signOut'] = () => ngZone.run(() => this.signOut());
  }
  ngOnInit() {
  }

  public onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //this.userImageUrl = profile.getImageUrl().toString();
    this.userImageUrl = {
      'background-image': 'url('+profile.getImageUrl()+'?sz=48)'
    };
    //console.log(this.userImageUrl, typeof this.userImageUrl, googleUser, profile);
    this.signIn = true;
  }

  public pleaseCallThis() {
    console.log("please call this");
  }

  public signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      this.signIn = false;
    });
  }
}
