import {Component, OnDestroy, OnInit} from "@angular/core";
import {ChatService} from "../../service/chat.service";
import {Message} from "../../model/message";
import {HttpClient} from "@angular/common/http";
import {timeout} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  chatNames: string[] = [];
  messages: Message[] = [];
  text: string = '';
  isCreating: boolean = true;
  isHelp: boolean = false;
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
    this.chatService.getChatNames().subscribe(data => {
      this.chatNames = data;
    })
    this.isCreating = false;
    this.chatService.getChat(chat).subscribe(data => {
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

  help_open(){
    this.isHelp = true;
  }

  help_close(){
    this.isHelp = false;
  }
  sendMessage() {
    let temp = this.messages.length;
    if (this.isCreating) {

      this.chatService.createChat(this.text);
      this.chatName = this.text;
      this.isCreating = false;
    }
    this.chatService.addMessage(this.chatName, this.text).subscribe(()=>{});
      this.messages.push({
        sender: "user",
        text: this.text
      })
      this.text = ''
      setTimeout(() => {
          this.updateChat(this.chatName)
      }, 20000)
   }
}



