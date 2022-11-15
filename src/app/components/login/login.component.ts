import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  firebaseErrorMessage!: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  submit() {
    if (this.loginForm.invalid) return;

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .then((result) => {
        if (result == null) {
          this.router.navigate(['/dashboard']);
        }
      });
  }
}
