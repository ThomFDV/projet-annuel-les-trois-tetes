import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ThemeService} from "../../../services/theme.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Theme} from "../../../models/theme";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

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
  user: User;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private themeService: ThemeService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
        this.user = user;

        if(user.type == 'teacher' || user.type == 'admin') {
          let id: string;

          this.route.params.subscribe(params => id = params.id);

          this.themeService.getThemeById(id)
            .subscribe(theme => {

              this.theme = theme;
            }, (err) => {
              console.error(err);
            });

          this.newCourseForm = this.formBuilder.group({
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

    let id: string;

    this.route.params.subscribe(params => id = params.id);

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
          alert(`${error.error.message}`);
        });
  }
}
