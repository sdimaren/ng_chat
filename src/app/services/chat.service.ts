import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public chatrooms: Observable<any>;
  public changeChatrooms: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService
  ) { 
    this.selectedChatroom = this.changeChatrooms.pipe(switchMap(chatroomId => {
      if (chatroomId) {
        this.loadingService.isLoading.next(true);
        return db.doc(`chatrooms/${chatroomId}`).valueChanges();
      }
      return of(null);
    }))
    this.chatrooms = db.collection('chatrooms').valueChanges();
  }
}
