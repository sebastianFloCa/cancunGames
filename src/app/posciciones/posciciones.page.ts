import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PositionsService} from '../services/airTable/positions.service';

@Component({
  selector: 'app-posciciones',
  templateUrl: './posciciones.page.html',
  styleUrls: ['./posciciones.page.scss'],
})
export class PoscicionesPage implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute, public PS: PositionsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id: ', this.id);
    this.PS.getcategoria(this.id);
  }

}
