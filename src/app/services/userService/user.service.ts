import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { FirebaseStorage } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userId: string;
  fbData: any = {};
  user: any;
  codes = [];
  urlImage: string;

  constructor( private FS: AngularFirestore, private storageCtrl: Storage,
               private toastCtrl: ToastController, private router: Router,
               public loadingController: LoadingController, private storage: Storage,
               private FSI: AngularFireStorage) {

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

  addUser(data: any) {
    // here we are going to upload the user to google firebase
    const promesa =  new Promise( (resolve, reject) => {
      this.FS.collection('user').doc(this.userId).set({
        nombre: this.fbData.name,
        correo: this.fbData.mail,
        usuarioId: this.fbData.user,
        fotoRef: this.fbData.photo,
        edad: data.edad,
        estatura: data.estatura,
        peso: data.peso,
        box: data.box,
        division: data.division,
        telefono: data.telefono,
        backSquat: data.backSquat,
        cleanJerk: data.cleanJerk,
        snatch: data.snatch,
        deadlift: data.deadlift,
      }).then( () => {
        // here we know the user were added successfully
        console.log('Added Correctly user to Backend');
        this.storageCtrl.set('user', this.userId).then( res => {
          console.log('user register in localstorage: ', res);
        }).catch( e => {
          console.log('something went wrong adding user to localstorage');
        });
        resolve(true);
      }).catch( e => {
        console.log('error adding user to backend: ', JSON.stringify(e));
        resolve(false);
        reject();
      });
    });

    return promesa;
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  setUser(nombre: string , dato: any) {
    this.storageCtrl.set(nombre, dato ).then( res => {
      console.log('Key correctly added: ' + nombre);
    }).catch( e => {
      console.log('Error addin the KEY: ', nombre);
    });
  }

  addCodes() {

    for ( let i = 0; i < 500; i++) {
      const id = Math.random().toString(36).substring(2);
      this.FS.collection('codes').doc(id).set({
        code: id
      }).then( () => {
        console.log('hecho');
        this.codes.push(id);
      } )
      .catch( () => console.log('error') );
    }

  }

  setLocalUser(user: any)  {
    this.user = user;
  }

  getUser() {
    const promesa =  new Promise ( (resolve, reject) => {
      this.storage.ready().then( () => {
        this.storage.get('user').then( usr => {
          if ( usr != null ) {
            console.log('we have user in the storage');
            const usuario = this.FS.collection('user').doc(usr).get();
            usuario.forEach( dato => {
              if ( dato.exists ) {
                this.user = dato.data();
                console.log('usuario en servicio: ', this.user);
                resolve();
              } else {
                reject();
              }
            });
          }
        });
      });
    } );
    return promesa;
  }

  uploadImage(img: string) {
    const promesa = new Promise( (resolve, reject) => {
      this.mostrarToast('Uploading image');
      const id = Math.random().toString(36).substring(2);
      const storage = this.FSI.storage.ref();
      const carsImg = storage.child(`user/${id}`);
      carsImg.putString(img, 'base64', {contentType: 'image/JPEG'}).then( (snapshot) => {
        console.log('image uploaded');
        snapshot.ref.getDownloadURL().then( (url) => {
          console.log(url);
          this.urlImage = url;
          if ( this.urlImage ) {
            this.mostrarToast('imagen subida correctamente');
            this.addUrl(url);
            resolve();
          }
        });
      }).catch( (error) => {
        this.mostrarToast('Something wen wrong, try again later: ');
        console.log('ERROR uploading image: ',  JSON.stringify(error));
      });
        /*
      const uploadTask: firebase.storage.UploadTask =
         storage.child(`carsimg/${id}`)
                .putString(img, 'base64', {contentType: 'image/JPEG'});
              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                 () => {}, // % de cuantos bites se han subido
                 (error) => {
                 // manejo de ErrorHandler
                 console.log('Error en la carga');
                 console.log(JSON.stringify(error));
                 this.mostrarToast(JSON.stringify(error));
                 reject();
               },
               () => {
                 // Todo bien
                 console.log('archivo subido');
                 this.mostrarToast('Images uploaded');
                 const url = uploadTask.snapshot.downloadURL;
                 console.log(url);
                 resolve();
               }
              );*/
          });
      /*
      const storage = this.FSI.storage.ref(`carsimg/${id}`);
      const task =  this.FSI.upload(`carsimg/${id}`, img);
      this.uploadPercentage = task.percentageChanges();
      task.snapshotChanges().pipe(finalize( () => this.urlImage = storage.getDownloadURL())).subscribe();
      */

    return promesa;
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  addUrl(url: string) {
    console.log('entro a agergar url de perfil');
    this.FS.collection('user').doc(this.userId).update({
      profileImg: url
    }).then( () => {
      this.presentToast('La imagen ha sido enlazada correctamente a tu perfil');
    }).catch( (e) => {
      this.presentToast('Error: comunicate con los administradores o revisa tu conexión: ' + JSON.stringify(e));
    });
  }

  uploadImagePortada(img: string) {
    const promesa = new Promise( (resolve, reject) => {
      this.mostrarToast('Uploading image');
      const id = Math.random().toString(36).substring(2);
      const storage = this.FSI.storage.ref();
      const carsImg = storage.child(`user/${id}`);
      carsImg.putString(img, 'base64', {contentType: 'image/JPEG'}).then( (snapshot) => {
        console.log('image uploaded');
        snapshot.ref.getDownloadURL().then( (url) => {
          console.log(url);
          this.urlImage = url;
          if ( this.urlImage ) {
            this.mostrarToast('imagen subida correctamente');
            this.addUrlPortada(url);
            resolve();
          }
        });
      }).catch( (error) => {
        this.mostrarToast('Something wen wrong, try again later: ');
        console.log('ERROR uploading image: ',  JSON.stringify(error));
      });
        /*
      const uploadTask: firebase.storage.UploadTask =
         storage.child(`carsimg/${id}`)
                .putString(img, 'base64', {contentType: 'image/JPEG'});
              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                 () => {}, // % de cuantos bites se han subido
                 (error) => {
                 // manejo de ErrorHandler
                 console.log('Error en la carga');
                 console.log(JSON.stringify(error));
                 this.mostrarToast(JSON.stringify(error));
                 reject();
               },
               () => {
                 // Todo bien
                 console.log('archivo subido');
                 this.mostrarToast('Images uploaded');
                 const url = uploadTask.snapshot.downloadURL;
                 console.log(url);
                 resolve();
               }
              );*/
          });
      /*
      const storage = this.FSI.storage.ref(`carsimg/${id}`);
      const task =  this.FSI.upload(`carsimg/${id}`, img);
      this.uploadPercentage = task.percentageChanges();
      task.snapshotChanges().pipe(finalize( () => this.urlImage = storage.getDownloadURL())).subscribe();
      */

    return promesa;
  }

 addUrlPortada(url: string) {
    this.FS.collection('user').doc(this.userId).update({
      portadaImg: url
    }).then( () => {
      this.presentToast('La imagen ha sido enlazada correctamente a tu perfil');
    }).catch( (e) => {
      this.presentToast('Error: comunicate con los administradores o revisa tu conexión: ' + JSON.stringify(e));
    });
  }

}
