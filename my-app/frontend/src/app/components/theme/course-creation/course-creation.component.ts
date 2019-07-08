import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ThemeService} from "../../../services/theme.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Theme} from "../../../models/theme";

@Component({
  selector: 'app-course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss']
})
export class CourseCreationComponent implements OnInit {

  newCourseForm: FormGroup;
  submitted = false;
  theme: Theme;
  number: Number;

  constructor( private route: ActivatedRoute,
               private formBuilder: FormBuilder,
               private themeService: ThemeService,
               private router: Router
  ) { }

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

    this.newCourseForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  onSubmit() {

    let id: string;

    this.route.params.subscribe( params => id = params.id);

    if (this.newCourseForm.invalid) {
      return;
    }
    this.themeService.addCourse(this.newCourseForm.value, id)
      .subscribe(
        () => {
          alert('Le cours à bien été créé!');
          this.router.navigate([`theme/${id}`]);
          this.submitted = true;
        },
        error => {
          alert('Vous n\'êtes pas connecté, échec de la création');
        });
  }
}
