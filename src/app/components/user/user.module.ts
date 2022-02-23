import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleLoginDirective } from './google-login.directive';
import { EmailLoginComponent } from './email-login/email-login.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent, GoogleLoginDirective, EmailLoginComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, ReactiveFormsModule],
  exports: [GoogleLoginDirective],
})
export class UserModule {}
