import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ToastController, Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { trigger, style, animate, transition, group, query, animateChild } from '@angular/animations';
import { Router } from '@angular/router';
import {UserService} from '../services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [

    trigger('container', [
      transition(':enter', [
          style({opacity: '0'}),
          group([
            animate('500ms ease-out', style({opacity: '1'})),
            query('@badge, @message', [
              animateChild()
            ])
          ])

      ]),
      transition(':leave', [
          group([
            animate('500ms ease-out', style({opacity: '0'})),
            query('@badge, @message', [
              animateChild()
            ])
          ])
      ])
    ]),

    trigger('badge', [
       transition(':enter', [
           style({transform: 'translateY(400%)'}),
           animate('500ms ease-out', style({transform: 'translateY(0)'}))
       ]),
       transition(':leave', [
           animate('500ms ease-in', style({transform: 'translateY(400%)'}))
       ])
   ]),

   trigger('message', [
     transition(':enter', [
         style({opacity: '0'}),
         animate('500ms 1000ms ease-out', style({opacity: '1'}))
     ]),
     transition(':leave', [
         animate('500ms ease-in', style({opacity: '0'}))
     ])
   ])

  ]
})
export class LoginPage implements OnInit {

  box: string;
  peso: string;
  estatura: number;
  division: string;
  edad: number;
  telefono: number;
  backSquat: number;
  cleanJerk: number;
  snatch: number;
  deadlift: number;
  fbData: any = {};
  public displayAchievement: boolean;
  public databoolean: boolean;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController,
              private platformCtrl: Platform, private FB: Facebook,
              private router: Router, public US: UserService) { }

  ngOnInit() {
    // init the page
  }

  signInWithFacebook() {

    this.platformCtrl.ready().then( () => {
      if ( this.platformCtrl.is('cordova') ) {
        // cellphone
        this.FB.login(['public_profile', 'user_friends', 'email'])
        .then((res: FacebookLoginResponse) => {
          console.log('Logged into Facebook!', res);
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          this.afAuth.auth.signInWithCredential(facebookCredential).then( user => {
            console.log('user info: ', user);
           //  this.presentToast('Signing-in complete');
            const data = {
              name: user.user.displayName,
              mail: user.user.email,
              user: user.user.uid,
              photo: user.user.photoURL
            };
            this.fbData = data;
            console.log('we define the data');
            this.US.addUserFacebook(data);
            this.presentToast('Inicio de Sesión exitoso');
            this.databoolean = true;
          }).catch( (e) => {
            // this.presentToast('Something went wrong, try later');
            console.log('error getting info', JSON.stringify(e) );
          });
        })
        .catch(e => console.log('Error logging into Facebook', e));
        console.log('data we extract before error: ', this.fbData);
        // this.US.addUserFacebook(this.fbData);
      } else {
          // computer
          this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
            console.log(res);
            this.presentToast('Signing-in complete');
            const user = res.user;
            const data = {
              name: user.displayName,
              mail: user.email,
              user: user.uid,
              photo: user.photoURL
            };
            this.databoolean = true;
            this.US.addUserFacebook(data);
        });
      }
    });
  }

  completeRegister() {
    console.log('empezando proceso de mandar info');
    const perfil = {
      edad: this.edad,
      estatura: this.estatura,
      peso: this.peso,
      box: this.box,
      division: this.division,
      telefono: this.telefono,
      backSquat: this.backSquat,
      cleanJerk: this.cleanJerk,
      snatch: this.snatch,
      deadlift: this.deadlift,
    };

    console.log(perfil);
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}

