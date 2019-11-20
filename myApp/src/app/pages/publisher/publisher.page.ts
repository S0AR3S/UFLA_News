import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { publicadoresModel } from 'src/app/model/publicadores.model';
import { publicadoresService } from 'src/app/services/publicadores.service';
import { NewsService } from 'src/app/services/news.service';
import { NewsModel } from 'src/app/model/news.model';
import { LikesPipe } from 'src/app/pipes/likes.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.page.html',
  styleUrls: ['./publisher.page.scss'],
})
export class PublisherPage implements OnInit {
  currentPublisher: publicadoresModel;
  publisherId: number;
  boletins: NewsModel[];

  constructor(public activatedRoute: ActivatedRoute,
    public publicadoresService: publicadoresService,
    public newsService: NewsService
    ) { }

  async ngOnInit() {
    this.publisherId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.currentPublisher = await this.publicadoresService.searchById(this.publisherId);
    this.boletins = await this.newsService.getAllByPublisherId(this.publisherId);
  }

}
