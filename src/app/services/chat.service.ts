import { AuthService } from './auth.service';
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
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;

  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {
    this.selectedChatroom = this.changeChatroom.pipe(switchMap(chatroomId => {
      if (chatroomId) {
        // this.loadingService.isLoading.next(true);
        return db.doc(`chatrooms/${chatroomId}`).valueChanges();
      }
      return of(null);
    }));

    this.selectedChatroomMessages = this.changeChatroom.pipe(switchMap(chatroomId => {
      if (chatroomId) {
        console.log(chatroomId)
        // this.loadingService.isLoading.next(true);
        return db.collection(`chatrooms/${chatroomId}/messages`, ref => {
          return ref.orderBy('createdAt').limit(100);
        })
        .valueChanges();
      }
      return of(null);
    }));
    this.chatrooms = db.collection('chatrooms').valueChanges();
  }

  public createMessage(text: string): void {
    // console.log(this.authService.currentUserSnapshot.id);
    const chatroomId = this.changeChatroom.value;
    const message = {
      message: text,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapshot
    };
    // console.log("Message ID:" + message.sender.id)
    this.db.collection(`chatrooms/${chatroomId}/messages`).add(message);
  }
}
