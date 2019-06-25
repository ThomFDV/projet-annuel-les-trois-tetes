import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from "../../models/article";
import {ArticleService} from "../../services/article.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article;
  newCommentForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService,
              private formBuilder: FormBuilder) {
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

    this.newCommentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });

  }

  onSubmit() {

    if (this.newCommentForm.invalid) {
      alert('Format invalide');
      return;
    }

    let id: string;
    this.route.params.subscribe( params => id = params.id);

    this.articleService.addComment(this.newCommentForm.value, id)
        .subscribe(
            () => {
              alert('Le commentaire a bien été posté!');
              window.location.reload();
            },
            error => {
              alert('Vous n\'êtes pas connecté, échec de la création');
            });
  }

  comment(articleId) {
    // this.articleService.addComment(articleId).subscribe(() => {
    // }), () => {
    //   alert('Une erreur est survenue');
    // };
  }
}
