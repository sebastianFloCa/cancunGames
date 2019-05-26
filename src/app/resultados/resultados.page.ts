import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PositionsService} from '../services/airTable/positions.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  constructor( private router: Router, public PS: PositionsService) { }

  ngOnInit() {
    this.PS.presentLoading();
  }

  gotolist(id: number) {
    this.router.navigate(['/posciciones']);
  }

}
