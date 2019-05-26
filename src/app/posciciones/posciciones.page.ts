import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PositionsService} from '../services/airTable/positions.service';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-posciciones',
  templateUrl: './posciciones.page.html',
  styleUrls: ['./posciciones.page.scss'],
})
export class PoscicionesPage implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute, public PS: PositionsService,
              public loadingController: LoadingController, private platform: Platform,
              private router: Router) {
                  this.platform.ready().then( () => {
                    this.platform.backButton.subscribe( () => {
                      this.router.navigate(['/tabs']);
                    });
                  });
               }

  ngOnInit() {
    this.presentLoading();
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id: ', this.id);
    this.PS.getcategoria(this.id);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

}
