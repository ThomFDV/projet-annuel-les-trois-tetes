import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ArticleService} from '../../../services/article.service';
import {first} from 'rxjs/operators';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.scss']
})
export class ArticleCreationComponent implements OnInit {

  newArticleForm: FormGroup;
  submitted = false;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
        this.user = user;
        if (user.type == 'teacher' || user.type == 'admin') {
          this.newArticleForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            content: ['', [Validators.required]]
          });
        }
        else {
          alert('Vous n\'avez pas l\'autorisation pour accéder à cette page');
        }
      },
      error => {
        alert('Vous devez vous connecter');
        this.router.navigate([`login`]);
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
            alert(`${error.error.message}`);
        });
  }

}
