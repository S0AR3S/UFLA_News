import { Component, OnInit } from '@angular/core';
import { publicadoresService } from 'src/app/services/publicadores.service';
import { publicadoresModel } from 'src/app/model/publicadores.model';


@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  lstPublicadores: publicadoresModel[];

  constructor(public publicadoresService: publicadoresService) { }

  async ngOnInit() {
    this.lstPublicadores = await this.publicadoresService.getAll();
  }

  async doRefresh(event: any) {
    try {
      this.lstPublicadores = await this.publicadoresService.getAll();
    } finally {
      event.target.complete();
    }    
  }

  async updateListPublicadores(event: any) {
    this.lstPublicadores = await this.publicadoresService.searchByTitle(event.target.value);
  }



}
