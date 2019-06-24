import { Component, OnInit } from '@angular/core';
import {Article} from '../../../models/article';
import {ArticleService} from '../../../services/article.service';

@Component({
  selector: 'app-article-collection',
  templateUrl: './article-collection.component.html',
  styleUrls: ['./article-collection.component.scss']
})
export class ArticleCollectionComponent implements OnInit {

  private articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticle().subscribe((res: Article[]) => {
      this.articles = res;
    }), err => {
      alert('Une erreur est survenue' + err);
    };
  }
}
