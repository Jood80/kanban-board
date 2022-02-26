import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  userId: string;
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private firetore: AngularFirestore,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;

    this.user$ = this.firetore
      .collection('users')
      .doc<any>(this.userId)
      .valueChanges()
      .pipe(
        tap((user) => {
          this.seo.generateTags({
            title: user.name,
            description: user.bio,
            image: user.image,
          });
        })
      );
  }
}
