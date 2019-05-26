import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { HomePage } from '../home/home.page';
import { PositionsService } from '../services/airTable/positions.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private platform: Platform, private router: Router,
              public US: UserService, private home: HomePage,
              private PS: PositionsService) {
                this.platform.ready().then( () => {
                  this.platform.backButton.subscribe( () => {
                    this.router.navigate(['/home']);
                  });
              });
  }

  ngOnInit() {
    this.PS.presentLoading();
    this.US.getUser().then( () => {
      console.log('usuario en bencmark: ', this.US.user);
    });
  }

}
