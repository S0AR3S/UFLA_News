import { Injectable } from '@angular/core';
import { NewsModel } from '../model/news.model';
import { SectionModel } from '../model/section.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';
import { AuthService } from './auth.service';
import { CommentModel } from '../model/comment.model';
import { UserModel } from '../model/user.model';

const API_URL: string = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(public http: HttpClient, public authService: AuthService) { }

  async getHttpOptions() {
    const token = await this.authService.getAuthToken();

    const options = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };

    return options;
  }

  async getAll(): Promise<NewsModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/boletins`, options).map(
      (itens: NewsModel[]) => {
        return itens.map(
          (item: NewsModel) => {
            return new NewsModel(
              item.id, item.title, item.likes, item.publishedAt,
              item.image, item.content, item.link, item.sections.map(section => new SectionModel(section.title, section.content)));
          }
        )
      }
    ).toPromise();
  }

  async searchById(id: number): Promise<NewsModel> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/boletins/${id}`, options).map(
      (item: NewsModel) => {
        return new NewsModel(
          item.id, item.title, item.likes, item.publishedAt,
          item.image, item.content, item.link, item.sections.map(section => new SectionModel(section.title, section.content)));
      }
    ).toPromise();
  }

  async searchByTitle(title: string): Promise<NewsModel[]> {

    title = title.trim().toLowerCase();

    if (title == '') {
      return this.getAll();
    }

    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/boletins?q=${title}`, options).map(
      (itens: NewsModel[]) => {
        return itens.map(
          (item: NewsModel) => {
            return new NewsModel(
              item.id, item.title, item.likes, item.publishedAt,
              item.image, item.content, item.link, item.sections.map(section => new SectionModel(section.title, section.content)));
          }
        )
      }
    ).toPromise();
  }

  async getAllByPublisherId(id: number): Promise<NewsModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/boletins?idPub=${id}`, options).map(
      (itens: NewsModel[]) => {
        return itens.map(
          (item: NewsModel) => {
            return new NewsModel(
              item.id, item.title, item.likes, item.publishedAt,
              item.image, item.content, item.link, item.sections.map(section => new SectionModel(section.title, section.content)));
          }
        )
      }
    ).toPromise();
  }

  async getAllCommentsByBoletimId(id: number): Promise<CommentModel[]> {
    const options = await this.getHttpOptions();

    return this.http.get(`${API_URL}/comments?boletinId=${id}&_expand=user`, options).map(
      (itens: CommentModel[]) => {
        return itens.map(
          (item: CommentModel) => {
            return new CommentModel(
              item.content, item.publishedAt, new UserModel(item.user.id, item.user.name, item.user.email));
          }
        )
      }
    ).toPromise();
  }
  async update(news: NewsModel) {
    const options = await this.getHttpOptions();

    return this.http.put(`${API_URL}/boletins/${news.id}`, news, options).map(
      (item: NewsModel) => {
        return new NewsModel(
          item.id, item.title, item.likes, item.publishedAt,
          item.image, item.content, item.link, item.sections.map(section => new SectionModel(section.title, section.content)));
      }
    ).toPromise();
  }
}