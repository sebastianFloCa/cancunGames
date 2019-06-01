import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import {UserService} from '../userService/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  userId: string;

  constructor(private oneSignal: OneSignal, private  US: UserService) {
  }

  configuracionPush() {
    this.oneSignal.startInit('52d2e588-7965-4c5b-b0a0-97bc28cc0da8', '520514445086');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    console.log('entro a config de notificaciones');

    this.oneSignal.handleNotificationReceived().subscribe(( noti ) => {
    // do something when notification is received
      console.log('Noti recieved: ', noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Noti opened: ', noti);
    });
    // obtener el ID de usuario de Notificaciones
    this.oneSignal.getIds().then( info => {
      this.userId = info.userId;
      this.US.setOSId(info.userId);
    });
    this.oneSignal.endInit();
  }
}
