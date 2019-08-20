import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoadingService } from './../../../../services/loading.service';
import { ChatService } from './../../../../services/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  public subscriptions: Subscription[] = []
  public chatroom: Observable<any>;
  public messages: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private loadingService: LoadingService
  ) { 
    this.subscriptions.push(
      this.chatService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
        this.loadingService.isLoading.next(false);
      })
    );

    this.subscriptions.push(
      this.chatService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
        this.loadingService.isLoading.next(false);
      })
    );
   }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const chatroomId = params.get('chatroomId');
        this.chatService.changeChatrooms.next(chatroomId);
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
