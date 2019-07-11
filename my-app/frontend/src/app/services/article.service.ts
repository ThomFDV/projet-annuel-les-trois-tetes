import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../models/article';
import {Comment} from '../models/comment';
import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  url = 'http://localhost:3000/article';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  createArticle(article: Article): Observable <any> {
    return this.http.post(this.url + '/create', {
      'title': `${article.title}`,
      'content': `${article.content}`
    }, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  getArticle() {
    return this.http.get(this.url, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  getArticleById(articleId): Observable <Article> {
    return this.http.get<Article>(`${this.url}/${articleId}`, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  addComment(comment: Comment, articleId): Observable <any> {
    console.log(`\n\n${this.url}/${articleId}\n\n`);
    return this.http.post(`${this.url}/${articleId}`, {
      'title': `${comment.title}`,
      'content': `${comment.content}`,
    }, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  removeArticle(articleId) {
    return this.http.delete(`${this.url}/${articleId}`, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }
}
