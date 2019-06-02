import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../models/article';
import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  createArticle(article: Article): Observable <any> {
    return this.http.post('http://localhost:3000/article/create', {
      'title': `${article.title}`,
      'content': `${article.content}`,
      'type': `${article.type}`
    }, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }
}
