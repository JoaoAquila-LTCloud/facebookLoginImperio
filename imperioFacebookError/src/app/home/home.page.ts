import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private fb: Facebook) {}

  signWithFacebook() {
    this.fb.getLoginStatus().then((respStatus) => {
      console.log('login status: ', respStatus);

      if (respStatus.status === 'connected') {
        this.facebookGetData(respStatus.authResponse.userID);
      } else {
        this.fb.login(['public_profile', 'email'])
          .then((res: FacebookLoginResponse) => {
            console.log('Facebook response: ', res);
          
            if (res.status === 'connected') {
              console.log('res facebook: ', res);
              this.facebookGetData(res.authResponse.userID);
            }
          })
          .catch(e => console.log('Error logging into Facebook', e));
      }
    });
  }

  facebookGetData(userId: string) {
    const url = `/${userId}/?fields=id,email,name,picture,gender`;
    this.fb.api(url, [
      'public_profile'
    ]).then((user) => {
      console.log('FB USER: ', user);
    }).catch(e => console.log('FB USER ERROR: ', e));
  }
}
