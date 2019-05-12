import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// HTTP
import { HttpClientModule } from '@angular/common/http';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {firebase} from '../app/firebaseConfig';

// plugins
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestoreModule,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
