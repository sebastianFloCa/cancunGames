import { Component, OnInit } from '@angular/core';
import { PositionsService } from '../services/airTable/positions.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/userService/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: any = {};
  boolusr = false;
    constructor( public PS: PositionsService, private storage: Storage,
                 private FS: AngularFirestore, private US: UserService) {
      // this.PS.getcategoria1();
    }

    ngOnInit() {
      this.PS.presentLoading();
      this.storage.ready().then( () => {
        this.storage.get('user').then( usr => {
          if ( usr != null ) {
            console.log('we have user in the storage');
            const usuario = this.FS.collection('user').doc(usr).get();
            usuario.forEach( dato => {
              if ( dato.exists ) {
                this.usuario = dato.data();
                this.boolusr = true;
                // this.US.getUser();
              }
            });
          }
        });
      });
    }
}
