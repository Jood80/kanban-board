import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';

import { Board } from 'src/app/models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  board$: Observable<Board[]> = of([]);
  constructor(
    private authService: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  /**
   *Create & Delete a new board for the current user
   */
  async createBoard(data: Board) {
    const user = await this.authService.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      tasks: [{ description: 'Initiate the project', label: 'red' }],
    });
  }

  deleteBoard(boardID: string) {
    return this.db.collection('boards').doc(boardID).delete();
  }

  /**
   * Updates the tasks on board
   */
  updateTask(boardID: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardID).update({ tasks });
  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task),
      });
  }
}
