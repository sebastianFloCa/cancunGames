import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private apiKey = 'keydVLRkeik08u047';
private sort = '&sort%5B0%5D%5Bfield%5D=Lugar&sort%5B0%5D%5Bdirection%5D=asc';
  posciciones = [];

  constructor( private http: HttpClient, public loadingController: LoadingController) { }

  getcategoria(id: string) {
  // this.presentLoading();
    this.http.get('https://api.airtable.com/v0/app1GIrkM7dCxuUfg/categoria' + id + '?api_key=' + this.apiKey + this.sort)
             .pipe(map(res => res)).subscribe( data => {
                if ( data ) {
                  // console.log(data);
                  // tslint:disable-next-line:no-string-literal
                  this.posciciones.push(...data['records']);
                  console.log(this.posciciones);
                }
             });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }


}

interface Airtable {
  records: [];
}
