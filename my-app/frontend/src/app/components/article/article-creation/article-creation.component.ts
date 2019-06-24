import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ArticleService} from '../../../services/article.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  newArticleForm: FormGroup;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private articleService: ArticleService,
      private router: Router
  ) { }

  ngOnInit() {
    this.newArticleForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      type: ['', [Validators.required]]
    });
  }

  onSubmit() {

    if (this.newArticleForm.invalid) {
      return;
    }
    this.articleService.createArticle(this.newArticleForm.value)
        .subscribe(
            () => {
              alert('L\'article à bien été créé!');
              this.router.navigate(['articles/collection']);
              this.submitted = true;
            },
            error => {
              alert('Vous n\'êtes pas connecté, échec de la création');
            });
  }

}
