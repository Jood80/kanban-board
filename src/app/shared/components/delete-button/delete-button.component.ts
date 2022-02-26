import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent {
  hasConfirmedDelete: boolean = false;

  @Output() canDelete = new EventEmitter<boolean>();

  cancel(): void {
    this.hasConfirmedDelete = false;
  }

  confirmToDelete(): void {
    this.hasConfirmedDelete = true;
  }

  deleteBoard(): void {
    this.canDelete.emit(true);
    this.hasConfirmedDelete = false;
  }
}
