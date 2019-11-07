
import { UserModel } from './user.model';
import { publicadoresModel } from './publicadores.model';


export class FavoriteModel {
    public constructor(
        public iduser: number,
        public idpublicador: number,
        public id?: number) { }
}