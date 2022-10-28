import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,

    private usersService: UsersService,
    private fb: FormBuilder
  ) {}

  isProgressVisible!: boolean;
  firebaseErrorMessage!: string;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.registerForm.invalid) return;

    this.authService
      .signupUser(this.registerForm.value)
      .then((result) => {
        console.log(result);
        if (result == null) {
          console.log(result.isValid);
          this.router.navigate(['/dashboard']);
        } else if (result.isValid == false)
          this.firebaseErrorMessage = result.message;

        this.isProgressVisible = false;
      })
      .catch(() => {
        this.isProgressVisible = false;
      });
  }
}
