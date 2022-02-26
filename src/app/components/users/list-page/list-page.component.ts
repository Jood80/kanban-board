import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private seo: SeoService, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'User List',
      description: ' All users listed',
    });

    this.users$ = this.firestore
      .collection('users')
      .valueChanges({ idField: 'id' });
  }
}
