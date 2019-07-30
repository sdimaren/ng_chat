import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-title-bar',
  templateUrl: './chat-title-bar.component.html',
  styleUrls: ['./chat-title-bar.component.scss']
})
export class ChatTitleBarComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
