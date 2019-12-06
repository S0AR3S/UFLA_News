import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { publicadoresModel } from 'src/app/model/publicadores.model';
import { publicadoresService } from 'src/app/services/publicadores.service';
import { NewsService } from 'src/app/services/news.service';
import { NewsModel } from 'src/app/model/news.model';
import { LikesPipe } from 'src/app/pipes/likes.pipe';
import { FavoritesService} from 'src/app/services/favorite.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import {FavoriteModel} from 'src/app/model/favorite.model';


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.page.html',
  styleUrls: ['./publisher.page.scss'],
})
export class PublisherPage implements OnInit {
  currentPublisher: publicadoresModel;
  publisherId: number;
  inscritoId: number;
  boletins: NewsModel[];
  user: UserModel;

  constructor(public activatedRoute: ActivatedRoute,
    public publicadoresService: publicadoresService,
    public newsService: NewsService,
    public favoritesService: FavoritesService,
    public userService: UserService,
    public authService: AuthService,
    ) { }

  async ngOnInit() {
    this.publisherId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.currentPublisher = await this.publicadoresService.searchById(this.publisherId);
    this.boletins = await this.newsService.getAllByPublisherId(this.publisherId);
    const userEmail = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);
    this.inscritoId = await this.favoritesService.getFavoriteId(this.user.id, this.currentPublisher.id);
 



  }
  async handleFavorite() {
    if (!this.inscritoId) {
      const favorite = new FavoriteModel(this.user, this.currentPublisher);
      this.inscritoId = await this.favoritesService.add(favorite);
    } else {
      await this.favoritesService.delete(this.inscritoId);
      this.inscritoId = null;
    }
  }

}
