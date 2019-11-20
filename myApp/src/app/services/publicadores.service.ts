import { Injectable } from '@angular/core';
import { publicadoresModel } from '../model/publicadores.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/Rx';
import { AuthService } from './auth.service';

const API_URL: string = "http://localhost:8000";

@Injectable({
    providedIn: 'root'
  })

  export class publicadoresService {


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

    async searchById(id: number): Promise<publicadoresModel> {
      const options = await this.getHttpOptions();
  
      return this.http.get(`${API_URL}/publicadores/${id}`, options).map(
        (item: publicadoresModel) => {
          return new publicadoresModel(item.id, item.nome, item.foto);
        }
      ).toPromise();
    }  

    async getAll(): Promise<publicadoresModel[]> {
        const options = await this.getHttpOptions();
    
        return this.http.get(`${API_URL}/publicadores`, options).map(
          (itens: publicadoresModel[]) => {
            return itens.map(
              (item: publicadoresModel) => {
                return new publicadoresModel(
                  item.id, item.nome, item.foto);
              }
            )
          }
        ).toPromise();
      }
  
  
    async update(publicadores: publicadoresModel) {
      const options = await this.getHttpOptions();
  
      return this.http.put(`${API_URL}/publicadores/${publicadores.id}`, publicadores, options).map(
        (item: publicadoresModel) => {
          return new publicadoresModel(
            item.id, item.nome, item.foto);
        }
      ).toPromise();
    }

    async searchByTitle(nome: string): Promise<publicadoresModel[]> {

        nome = nome.trim().toLowerCase();
    
        const options = await this.getHttpOptions();
    
        return this.http.get(`${API_URL}/publicadores?q=${nome}`, options).map(
          (itens: publicadoresModel[]) => {
            return itens.map(
              (item: publicadoresModel) => {
                return new publicadoresModel(
                  item.id, item.nome, item.foto,);
              }
            )
          }
        ).toPromise();
      }
  }