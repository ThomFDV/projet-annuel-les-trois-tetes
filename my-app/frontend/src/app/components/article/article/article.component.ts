import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../../../models/article';
import {ArticleService} from '../../../services/article.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article;
  newCommentForm: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService: ArticleService,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
        this.user = user;

        let id: string;

        this.route.params.subscribe(params => id = params.id);
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

      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
      });
  }

  onSubmit() {

    if (this.newCommentForm.invalid) {
      alert('Format invalide');
      return;
    }

    let id: string;
    this.route.params.subscribe(params => id = params.id);

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

}
