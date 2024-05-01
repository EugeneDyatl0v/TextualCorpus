import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: any;

  constructor() {

  }

  connect(){
     this.socket = io('http://localhost:5000')
  }

  disconnect() {
      if (this.socket) {
          this.socket.disconnect();
      }
  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public getMessages(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });
    });
  }
}
