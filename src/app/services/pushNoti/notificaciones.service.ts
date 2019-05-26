import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private oneSignal: OneSignal) {
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

    this.oneSignal.endInit();
  }
}
