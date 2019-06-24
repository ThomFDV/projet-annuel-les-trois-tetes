import { Component, OnInit } from '@angular/core';
import {Article} from '../../../models/article';
import {ArticleService} from '../../../services/article.service';

@Component({
  selector: 'app-course-collection',
  templateUrl: './course-collection.component.html',
  styleUrls: ['./course-collection.component.scss']
})
export class CourseCollectionComponent implements OnInit {

  private cours: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getCours().subscribe((res: Article[]) => {
      this.cours = res;
    }), err => {
      alert('Une erreur est survenue' + err);
    };
  }
}
