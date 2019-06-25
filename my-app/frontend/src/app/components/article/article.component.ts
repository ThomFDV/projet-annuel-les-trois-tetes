import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Article} from "../../models/article";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article;

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService) {
  }

  ngOnInit() {
    let id: string;

    this.route.params.subscribe( params => id = params.id);
    this.articleService.getArticleById(id)
      .subscribe(article => {
        console.log(article.id);
         this.article = article;
      }, (err) => {
        console.error(err);
      });


  }

  comment(articleId) {
    // this.articleService.addComment(articleId).subscribe(() => {
    // }), () => {
    //   alert('Une erreur est survenue');
    // };
  }
}
