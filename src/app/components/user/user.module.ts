import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleLoginDirective } from './google-login.directive';

@NgModule({
  declarations: [LoginPageComponent, GoogleLoginDirective],
  imports: [CommonModule, UserRoutingModule, SharedModule],
  exports: [GoogleLoginDirective],
})
export class UserModule {}
