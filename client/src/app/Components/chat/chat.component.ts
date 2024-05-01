import {Component, OnDestroy, OnInit} from "@angular/core";
import {ChatService} from "../../service/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy{

  constructor(
    public chatService: ChatService,
  ) {
    this.chatService.connect();
  }

  sendMessage() {
    this.chatService.sendMessage("test");
  }

  ngOnInit(): void {
    this.chatService.getMessages().subscribe(data => {
      console.log(data);
    })
  }

    ngOnDestroy() {
      this.chatService.disconnect();
    }

}


