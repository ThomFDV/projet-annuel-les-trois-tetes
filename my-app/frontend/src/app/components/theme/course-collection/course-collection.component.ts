import { Component, OnInit } from '@angular/core';
import {Theme} from '../../../models/theme';
import {ThemeService} from '../../../services/theme.service';
import {Course} from "../../../models/course";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course-collection',
  templateUrl: './course-collection.component.html',
  styleUrls: ['./course-collection.component.scss']
})
export class CourseCollectionComponent implements OnInit {

  theme: Theme;
  userTheme;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    let id: string;
    this.route.params.subscribe( params => id = params.id);

    this.themeService.getUserTheme(id)
      .subscribe(userTheme => {
        this.userTheme = userTheme[0];

      }, (err) => {

        window.location.reload();
      });


    this.themeService.getThemeById(id)
      .subscribe(theme => {
        console.log(theme.id);
        this.theme = theme;
      }, (err) => {
        console.error(err);
      });



  }
  view(themeId, courseId) {

    this.themeService.getCourse(themeId, courseId).subscribe(() => {
    }), () => {
      alert('Une erreur est survenue');
    };
  }
}
