import { Component, OnInit } from '@angular/core';
import { ChatService } from './../../../../services/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit() {
  }

}
