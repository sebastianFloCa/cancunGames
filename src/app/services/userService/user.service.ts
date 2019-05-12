import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId: string;
  fbData: any = {};
  user: any = {};

  constructor( private FS: AngularFirestore, private storageCtrl: Storage,
               private toastCtrl: ToastController, private router: Router) {

  }

  addUserFacebook(data: any) {
    console.log('data we recieve in userService from facebook', data);
    if ( data ) {
      this.userId = data.user;
      this.fbData = data;
        // this.presentToast('Signing in with facebook succedeed');
        // this.SaveUser(data.user);
    } else {
      console.log( 'something went wrong ');
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
