import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { HomePage } from '../home/home.page';
import { PositionsService } from '../services/airTable/positions.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private platform: Platform, private router: Router,
              public US: UserService, private home: HomePage,
              private PS: PositionsService) {
                this.platform.ready().then( () => {
                  this.platform.backButton.subscribe( () => {
                    this.router.navigate(['/home']);
                  });
              });
                this.PS.presentLoading();
                this.US.getUser().then( () => {
                  console.log('usuario en bencmark: ', this.US.user);
                });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
