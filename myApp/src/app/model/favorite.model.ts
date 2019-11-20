
import { UserModel } from './user.model';
import { publicadoresModel } from './publicadores.model';


export class FavoriteModel {
    public constructor(
        public user: UserModel,
        public publicador: publicadoresModel,
        public id?: number) { }
}