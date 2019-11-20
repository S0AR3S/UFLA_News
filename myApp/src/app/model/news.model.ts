import { SectionModel } from 'src/app/model/section.model';
import { CommentModel } from './comment.model';

export class NewsModel {
    constructor(
        public id: number,
        public title: string,
        public likes: number,
        public publishedAt: Date,
        public image: string,
        public content: string,
        public link: string,
        public sections: SectionModel[]
    ) {}
} 