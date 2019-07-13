import {Component, OnInit} from '@angular/core';
import {Article} from '../../../models/article';
import {ArticleService} from '../../../services/article.service';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {Theme} from "../../../models/theme";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-article-collection',
  templateUrl: './article-collection.component.html',
  styleUrls: ['./article-collection.component.scss']
})
export class ArticleCollectionComponent implements OnInit {

  private articles: Article[] = [];
  user: User;

  constructor(private articleService: ArticleService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
        this.user = user;

        this.articleService.getArticle().subscribe((res: Article[]) => {
          this.articles = res;
        }), err => {
          alert('Une erreur est survenue');
        };

      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
      });

    this.articleService.subscribeArticle().on('article', (data) => {
      console.log(data);
      if (data) {
        this.articles = [data, ...this.articles];
      }
    });
    // this.articleService.subscribeArticle().emit('message', 'test');
  }

  view(articleId) {

    this.articleService.getArticleById(articleId).subscribe(() => {
    }), () => {
      alert('Une erreur est survenue');
    };
  }

  remove(articleId) {
    this.articleService.removeArticle(articleId).subscribe(() => {
      alert("L'article a bien ete supprime");
      window.location.reload();
    }), () => {
      alert('Une erreur est survenue');
    };
  }
}

