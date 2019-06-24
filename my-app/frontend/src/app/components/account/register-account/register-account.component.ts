import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              alert('Successfully registered!');
              this.router.navigate(['/']);
              this.submitted = true;
            },
            error => {
              alert('error !');
            });
  }
}
