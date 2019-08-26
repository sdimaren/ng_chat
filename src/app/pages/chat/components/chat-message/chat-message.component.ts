import { Component, OnInit, Input } from '@angular/core';
import { Message } from './../../../../classes/message';
import { AuthService } from './../../../../services/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

}
