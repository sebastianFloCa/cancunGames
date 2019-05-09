import { Component } from '@angular/core';
import { PositionsService } from '../services/airTable/positions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor( public PS: PositionsService) {
      // this.PS.getcategoria1();
    }
}
