import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBarservice: MatSnackBar, private router: Router) {}

  authError() {
    this.snackBarservice.open('🔑 Oh oh! you must be logged in ', 'Let me in', {
      duration: 5000,
    });

    return this.snackBarservice._openedSnackBarRef
      ?.onAction()
      .pipe(tap((_) => this.router.navigate(['/login'])))
      .subscribe();
  }
}
