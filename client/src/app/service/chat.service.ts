import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Message} from "../model/message";
import { timeout} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  timeout = 10000;

  constructor(private http: HttpClient) {

  }

  url = "http://localhost:5000/chat"

  public createChat(chat_name:string){
    this.http.post(`${this.url}?name=${chat_name}`, {})
      .pipe(
            timeout(1000)
      );
  }

  public getChat(chat_name:string){
    return this.http.get<Message[]>(`${this.url}/${chat_name}`);
  }

  public addMessage(chat_name:string, message:string){
    return this.http.get(`${this.url}/${chat_name}?message=${message}`, {});
  }

  public getChatNames(){
    return this.http.get<string[]>(this.url);
  }
}
