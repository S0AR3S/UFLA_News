import { Component, OnInit } from '@angular/core';
import { NewsModel } from 'src/app/model/news.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  private lstNews: NewsModel[];

  constructor() {

    this.lstNews = [
      new NewsModel({
        title: "Cotas começam a ser discutidas",
        likes: 88852,
        publishedAt: "03/10/2019 14:20:00",
        image: "https://www.lavras24horas.com.br/portal/wp-content/uploads/2018/02/ufla-oficial-2.jpg"
  
      }),
      new NewsModel({
        title: "RU começa a servir cardapio para Aliens",
        likes: 8884252,
        publishedAt: "01/10/2019 12:00:00",
        image: "https://praec.ufla.br/images/coordenadorias/alimentacao/restaurante-universitario.jpg"
  
      }),

      new NewsModel({
        title: "PAS cancelado devido ao ataque alien",
        likes: 20,
        publishedAt: "23/09/2019 18:25:23",
        image: "https://viacarreira.com/wp-content/uploads/2019/06/pas-ufla-2019-2020-inscricoes-datas-provas.jpg"

      }),
      new NewsModel({
        title: "Ufla aplicará PAS essa semana",
        likes: 10,
        publishedAt: "24/09/2019 15:00:24",
        image: "https://viacarreira.com/wp-content/uploads/2019/06/pas-ufla-2019-2020-inscricoes-datas-provas.jpg"


      })

    ];
  }

  ngOnInit() {
  }

}
