import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  constructor(private seo: SeoService, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'User List',
      description: ' All users listed',
    });
  }
}
