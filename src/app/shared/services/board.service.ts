import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, of, switchMap } from 'rxjs';

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

  getUserBoards() {
    return this.authService.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection('boards', (ref) =>
              ref.where('uid', '==', user.uid).orderBy('priority')
            )
            .valueChanges({ idField: 'id' }); //return as observable
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map((board) => db.collection('boards').doc(board.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
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
