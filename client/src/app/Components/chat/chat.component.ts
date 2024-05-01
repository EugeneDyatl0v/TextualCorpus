import {Component, OnDestroy, OnInit} from "@angular/core";
import {ChatService} from "../../service/chat.service";
import {Message} from "../../model/message";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  chatNames: string[] = [];
  messages: Message[] = [];
  text: string = '';
  isCreating: boolean = false;
  chatName = '';

  constructor(
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.getChatNames().subscribe(data => {
      this.chatNames = data;
    })
  }


  updateChat(chat: string) {
    this.chatName = chat;
    this.chatService.getChat(chat).subscribe(data => {
      console.log(data)
      this.messages = data;
    })
  }

  ngOnDestroy(): void {
    this.chatNames = [];
    this.messages = []
  }

  createChat() {
    this.messages = [];
    this.isCreating = true;
  }

  sendMessage() {
    if (this.isCreating){
      this.chatService.createChat(this.text);
      this.chatName = this.text;
      this.isCreating = false;
    }
    this.chatService.addMessage(this.chatName, this.text).subscribe(data =>
      this.updateChat(this.chatName)
    );
  }
}


