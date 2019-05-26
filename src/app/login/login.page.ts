import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { ToastController, Platform } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { trigger, style, animate, transition, group, query, animateChild } from '@angular/animations';
import { Router } from '@angular/router';
import {UserService} from '../services/userService/user.service';
import { Storage } from '@ionic/storage';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';

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
  imagen: any;
  public displayAchievement: boolean;
  public databoolean: boolean;
  public registerComplete: boolean;
  finish: boolean;
  imgCounter = 0;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController,
              private platformCtrl: Platform, private FB: Facebook,
              private router: Router, public US: UserService, private storage: Storage,
              private  IP: ImagePicker, private platform: Platform) { }

  ngOnInit() {
    // init the page
    this.storage.ready().then( () => {
      this.storage.length().then( (res) => {
        console.log('cantidad de llaves guardadas: ' + res);
        if ( res > 0) {
          this.storage.get('user').then( usr => {
            if ( usr != null || usr !== 'null' ) {
              console.log('usuario en login: ', usr);
              this.router.navigate(['/home']);
            }
          });
        }
      });
    });
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
    this.US.addUser(perfil).then( res => {
      this.databoolean = false;
      this.registerComplete = true;
    });
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  selectPhoto(what: number) {
    this.platform.ready().then( () => {
      if ( this.platform.is('cordova') ) {
        const options: ImagePickerOptions = {
          quality: 70,
          outputType: 1,
          maximumImagesCount: 1
        };
        if ( what === 1 ) {
          this.IP.getPictures(options).then((results) => {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < results.length; i++) {
                // console.log('Image URI: ' + results[i]);
                // this.imagenPreview = 'data:image/jpg;base64,' + results[i];
                this.imagen = results[i];
            }
            this.US.uploadImage(this.imagen).then( well => {
              // this.images.push(this.imagen);
              console.log( 'imagen subida ');
            });
          }, (err) => {
              console.log('entro en el error', JSON.stringify(err));
          });
        } else {
          this.IP.getPictures(options).then((results) => {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < results.length; i++) {
                // console.log('Image URI: ' + results[i]);
                // this.imagenPreview = 'data:image/jpg;base64,' + results[i];
                this.imagen = results[i];
            }
            this.US.uploadImagePortada(this.imagen).then( well => {
              // this.images.push(this.imagen);
              console.log( 'imagen subida ');
            });
          }, (err) => {
              console.log('entro en el error', JSON.stringify(err));
          });
        }
        this.imgCounter = this.imgCounter + 1;
        if ( this.imgCounter === 2) {
          this.finish = true;
        }
      } else {
        // supose we want to add web add images
        console.log('you are on web');
      }
    });
  }

  endProcess() {
    this.toastCtrl.create({
      message: 'Logro desbloqueado!',
      duration: 2500
    }).then((toast) => {
      toast.present();
    });

    this.displayAchievement = true;
    this.registerComplete = false;
    // this.audioCtrl.play('achievement');
    setTimeout(() => {
      this.displayAchievement = false;
      this.router.navigate(['/home']);
    }, 3000);
  }

}

