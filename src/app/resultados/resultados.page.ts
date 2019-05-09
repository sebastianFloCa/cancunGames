import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  gotolist(id: number) {
    this.router.navigate(['/posciciones']);
  }

}
