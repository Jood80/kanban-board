import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent implements OnInit {
  form: FormGroup;
  formType: 'login' | 'signup' | 'reset' = 'signup'; //TODO: handle this properly
  loading = false;
  serverMessage: string | unknown;

  constructor(
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', [Validators.required]],
    });
  }

  changeFormType(value: 'login' | 'signup' | 'reset') {
    this.formType = value;
  }

  get isLogin(): boolean {
    return this.formType === 'login';
  }

  get isSignup(): boolean {
    return this.formType === 'signup';
  }

  get isPasswordReset(): boolean {
    return this.formType === 'reset';
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  get passwordsDoMatch() {
    return this.formType !== 'signup'
      ? true
      : this.password?.value === this.confirmPassword?.value;
  }

  async onSubmit() {
    this.loading = true;
    const email = this.email?.value;
    const password = this.password?.value;

    try {
      if (this.isLogin) {
        await this.auth.signInWithEmailAndPassword(email, password);
      }
      if (this.isSignup) {
        await this.auth.createUserWithEmailAndPassword(email, password);
      }
      if (this.isPasswordReset) {
        await this.auth.sendPasswordResetEmail(email);
        this.serverMessage = 'please check your email';
      }
    } catch (error) {
      this.serverMessage = error;
    }
    this.loading = false;
  }
}
