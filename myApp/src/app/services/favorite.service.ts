import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';

import { FavoriteModel } from '../model/favorite.model';
import { AuthService } from './auth.service';
import { publicadoresService } from './publicadores.service';
import { publicadoresModel } from '../model/publicadores.model';
import { UserModel } from '../model/user.model';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  lista: FavoriteModel[];


  constructor(public http: HttpClient, public authService: AuthService, public publicadoresService: publicadoresService) { }

  async getHttpOptions() {
    const token = await this.authService.getAuthToken();

    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return options;
  }

  async getFavoriteId(iduser: number, idpublicador: number): Promise<number> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/inscritos?userId=${iduser}&publicadoreId=${idpublicador}`, options).map(
      (inscritos: FavoriteModel[]) => {
        return (inscritos.length == 0) ? null : inscritos[0].id;
      }
    ).toPromise();
  }

  async getAllByUser(userId: number): Promise<FavoriteModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/inscritos?_expand=user&_expand=publicadore&userId=${userId}`, options).map(
      (itens: FavoriteModel[]) => {
        console.log(JSON.stringify(itens, null, 2));
        return itens.map(
          (item: FavoriteModel) => {
            return new FavoriteModel(
              new UserModel(item.user.id, item.user.name, item.user.email),
              new publicadoresModel(item.publicadore.id, item.publicadore.nome, item.publicadore.foto),
              item.id
            );
          }
        )
      }
    ).toPromise();
  }


  async add(inscritos: FavoriteModel): Promise<number> {
    const data: any = {
      userId: inscritos.user.id,
      publicadoreId: inscritos.publicadore.id,

    }

    const options = await this.getHttpOptions();

    return this.http.post(`${API_URL}/inscritos`, data, options).map(
      (favorite: FavoriteModel) => {
        return favorite.id;
      }
    ).toPromise();
  }

  async delete(id: number): Promise<any> {
    const options = await this.getHttpOptions();

    return this.http.delete(`${API_URL}/inscritos/${id}`, options).toPromise();
  }
}