import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Article} from '../../../models/article';
import {ArticleService} from '../../../services/article.service';


@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.scss']
})
export class ArticleCommentComponent implements OnInit {
  newCommentForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.newCommentForm = this.formBuilder.group({

      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  async onSubmit() {

    if (this.newCommentForm.invalid) {
      alert('Format invalide');
      return;
    }
    await this.articleService.addComment(this.newCommentForm.value)
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
