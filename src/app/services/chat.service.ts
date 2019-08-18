import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chatrooms: Observable<any>;

  constructor(
    private db: AngularFirestore
  ) { 
    this.chatrooms = db.collection('chatrooms').valueChanges();
  }
}
