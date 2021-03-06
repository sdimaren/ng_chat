import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from './../classes/user';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;
  public currentUserSnapshot: User | null;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { 
    
    this.currentUser = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }))

      this.setCurrentUserSnapshot();
      console.log(this.setCurrentUserSnapshot());
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const updatedUser = {
          id: user.user.uid,
          email: user.user.email,
          firstName,
          lastName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/chat-3b38c.appspot.com/o/default-profile-pic.jpg?alt=media&token=e9058f14-edf2-456c-a586-7a637ab664b8'
        }

        userRef.set(updatedUser);
        return true;
      })
      .catch((err) => false)
    )
  }

  public login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => true)
        .catch((err) => false)
    )
  }

  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.toastrService.success("You have been logged out.");
    });

  }

  private setCurrentUserSnapshot(): void{
    this.currentUser.subscribe(user => this.currentUserSnapshot = user);
  }
}
