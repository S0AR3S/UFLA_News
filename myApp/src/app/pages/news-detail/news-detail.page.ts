import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsModel } from 'src/app/model/news.model';
import { NewsService } from 'src/app/services/news.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FavoritesService } from 'src/app/services/favorite.service';
import { FavoriteModel} from 'src/app/model/favorite.model';
import { UserModel } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { publicadoresModel } from 'src/app/model/publicadores.model';
import { CommentModel } from 'src/app/model/comment.model';
import { ToastService, MessageType } from 'src/app/services/toast.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

  currentNews: NewsModel;
  comments: CommentModel[];
  commentInput: CommentModel;
  starId: number;
  likeId: number;
  newsId: number;
  user: UserModel;
  publicadores: publicadoresModel;

  constructor(
    public activatedRoute: ActivatedRoute,
    public socialSharing: SocialSharing,
    public newsService: NewsService,
    public favoritesService: FavoritesService,
    public authService: AuthService,
    public userService: UserService,
    public toastService: ToastService) {
  }

  async ngOnInit() {
    const userEmail = await this.authService.getAuthEmail();
    this.user = await this.userService.getUserByEmail(userEmail);
    this.commentInput = new CommentModel();
    this.newsId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.currentNews = await this.newsService.searchById(this.newsId);
    this.comments = await this.newsService.getAllCommentsByBoletimId(this.newsId);
    console.log("COMENTS", this.comments);
    this.starId = await this.favoritesService.getFavoriteId(this.user.id, this.newsId);
    this.likeId = await this.favoritesService.getFavoriteId(this.user.id, this.newsId);
  }

  async shareWhatsApp() {
    const canShare: boolean = await this.socialSharing.canShareVia('whatsapp');
    if (canShare) {
      this.socialSharing.shareViaWhatsApp(this.currentNews.title,
        this.currentNews.image, this.currentNews.link);
    }
  }

  checkForm() {
    if (
      this.commentInput.content == undefined || this.commentInput.content.trim() == "") {
      this.toastService.presentMessage("Por favor, escreva um comentário para enviá-lo!", MessageType.ERROR);
      return false;
    }
    return true;
  }

  async saveComment() {
    if (this.checkForm()) {
      try {
        this.commentInput.publishedAt = new Date();
        this.commentInput.user = this.user;
        this.commentInput.boletim = this.currentNews;
        this.comments.push(await this.newsService.comment(this.commentInput));

        this.commentInput = new CommentModel();
        this.toastService.presentMessage("Comentario realizado com sucesso!", MessageType.SUCCESS);
      } catch (error) {
        this.toastService.presentMessage(`Erro ao realizar comentario! ${error.message}`, MessageType.ERROR);
      }
    }

  }

  async deleteComment(id) {
        await this.newsService.deleteComment(id);
        this.comments = this.comments.filter(comment => comment.id != id)
        this.toastService.presentMessage("Comentario apagado com sucesso!", MessageType.SUCCESS);
  }


  // async handleFavorite() {
  //   if (!this.starId) {
  //     const favorite = new FavoriteModel(this.user, this.publicadores);
  //     this.starId = await this.favoritesService.add(favorite);
  //   } else {
  //     await this.favoritesService.delete(this.starId);
  //     this.starId = null;
  //   }
  // }

  // async handleLike() {
  //   if (!this.likeId) {
  //     let favorite = new FavoriteModel(this.user, this.publicadores);
  //     this.likeId = await this.favoritesService.add(favorite);
  //     this.currentNews.likes += 1;
  //   } else {
  //     await this.favoritesService.delete(this.likeId);
  //     this.likeId = null;
  //     this.currentNews.likes -= 1;
  //   }
  //   this.currentNews = await this.newsService.update(this.currentNews);
  // }
}