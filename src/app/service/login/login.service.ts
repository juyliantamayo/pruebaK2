import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth,
    private router: Router,) { }
  createUser(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/insert']);
    }).catch(response => {
    });
  }
  signIn(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['/insert']);
    }).catch(response => {
      this.createUser(email, password)
    });
  }
}
