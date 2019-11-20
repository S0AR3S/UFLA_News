import { UserModel } from './user.model';

export class CommentModel {
    constructor(
        public content: string,
        public publishedAt: Date,
        public user: UserModel
    ) {}
} 