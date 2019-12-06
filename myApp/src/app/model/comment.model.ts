import { UserModel } from './user.model';

export class CommentModel {
    constructor(
        public id?: number,
        public content?: string,
        public publishedAt?: Date,
        public user?: UserModel,
        public boletim?: NewsModel
    ) {}
} 