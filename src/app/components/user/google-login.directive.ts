import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Directive({
  selector: '[appGoogleLogin]',
})
export class GoogleLoginDirective {
  constructor(private auth: AngularFireAuth) {}

  @HostListener('click')
  onclick() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
}
