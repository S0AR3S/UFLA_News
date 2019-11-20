
import { UserModel } from './user.model';
import { publicadoresModel } from './publicadores.model';


export class FavoriteModel {
//   [x: string]: publicadoresModel;
    public constructor(
        public user: UserModel,
        public publicadore: publicadoresModel,
        public id?: number) { }
}