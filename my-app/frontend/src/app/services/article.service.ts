import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../models/article';
import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = 'http://localhost:3000/article';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  createArticle(article: Article): Observable <any> {
    return this.http.post(this.url + '/create', {
      'title': `${article.title}`,
      'content': `${article.content}`,
      'type': `${article.type}`
    }, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  getArticle() {
    return this.http.get(this.url + '/articles');
  }
  getCours() {
    return this.http.get(this.url + '/courses');
  }

  getArticleById(articleId): Observable <Article> {
    return this.http.get<Article>(`${this.url}/${articleId}`);
  }
}
