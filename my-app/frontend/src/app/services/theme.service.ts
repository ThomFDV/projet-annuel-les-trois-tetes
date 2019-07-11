import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Theme} from '../models/theme';
import {Course} from '../models/course';
import {TokenStorageService} from './token-storage.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  url = 'http://localhost:3000/theme';


  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  createTheme(theme: Theme): Observable <any> {
    return this.http.post(this.url + '/create', {
      'title': `${theme.title}`,
    }, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  getThemes() {
    return this.http.get(this.url, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  getThemeById(themeId): Observable <Theme> {

    return this.http.get<Theme>(`${this.url}/${themeId}`, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  addCourse(course: Course, themeId): Observable <any> {

    return this.http.post(`${this.url}/${themeId}/newcourse`, {
      'title': `${course.title}`,
      'content': `${course.content}`,
    }, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  getCourse(themeId, courseId) : Observable <Theme> {
    return this.http.get<Theme>(`${this.url}/${themeId}/course/${courseId}`, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }

  getUserTheme(themeId) : Observable <any> {
    return this.http.get<any>(`${this.url}/${themeId}/orderId`, {
      headers: this.tokenStorage.getHeaderToken()
    });
  }
}
