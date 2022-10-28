import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  userCollection!: AngularFirestoreCollection<any>;
  collection: any;

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
