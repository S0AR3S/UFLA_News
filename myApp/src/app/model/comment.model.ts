import { UserModel } from './user.model';
import { NewsModel } from './news.model';

export class CommentModel {
    constructor(
        // public content: string,
        // public publishedAt: Date,
        // public user: UserModel
        public id?: number,
        public content?: string,
        public publishedAt?: Date,
        public user?: UserModel,
        public boletim?: NewsModel
    ) {}
} 