import { Component, OnInit } from '@angular/core';
import {Theme} from '../../../models/theme';
import {ThemeService} from '../../../services/theme.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../../models/course";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  theme: Theme;

  constructor(private themeService: ThemeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let themeId: string;
    let courseId: string;

    this.route.params.subscribe( params => themeId = params.themeId);
    this.route.params.subscribe( params => courseId = params.courseId);

    this.themeService.getCourse(themeId, courseId)
      .subscribe(theme => {
        this.theme = theme[0];


      }, (err) => {
        console.error(err);
      });
  }


}
