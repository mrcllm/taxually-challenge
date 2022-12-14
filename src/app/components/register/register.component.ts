import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

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

    this.authService.signupUser(this.registerForm.value).then((result) => {
      console.log(result);
      result == null
        ? this.router.navigate(['/dashboard'])
        : (this.firebaseErrorMessage = result.message);
    });
  }
}
