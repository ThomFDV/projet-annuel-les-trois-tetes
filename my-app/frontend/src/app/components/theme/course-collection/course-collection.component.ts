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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    let id: string;

    this.route.params.subscribe( params => id = params.id);
    this.themeService.getThemeById(id)
      .subscribe(theme => {
        console.log(theme.id);
        this.theme = theme;
      }, (err) => {
        console.error(err);
      });

  }

}
