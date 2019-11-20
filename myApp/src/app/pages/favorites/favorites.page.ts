import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorite.service';
import { FavoriteModel } from 'src/app/model/favorite.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { publicadoresModel } from 'src/app/model/publicadores.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  lstInscritos: FavoriteModel[];
  user: UserModel;

  constructor(
    public favoritesService: FavoritesService,
    public authService: AuthService,
    public userService: UserService) {
  }

  async ngOnInit() {
    const userEmail: string = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);

    this.lstInscritos = await this.favoritesService.
    getAllByUser(this.user.id);
    console.log(this.lstInscritos)
  }

  async doRefresh(event: any) {
    try {
      this.lstInscritos = await this.favoritesService.
      getAllByUser(this.user.id);
    } finally {
      event.target.complete();
    }
  }
}