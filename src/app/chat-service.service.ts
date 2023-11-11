import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export class Message {
  constructor(public author: string, public content: string) {}
}
@Injectable()
export class ChatService {
  constructor(private http: HttpClient) {}
  conversation = new Subject<Message[]>();
  /*messageMap: { [key: string]: string } = {
    "Hi": "Hello",
    "Who are you": "My name is Test Sat Bot",
    "What is your role": "Just guide for the user",
    "defaultmsg": "I can't understand your text. Can you please repeat"
  }

  getBotAnswer(msg: string) {
      const userMessage = new Message('user', msg);
      this.conversation.next([userMessage]);
      const botMessage = new Message('bot', this.getBotMessage(msg));
      setTimeout(() => {
        this.conversation.next([botMessage]);
      }, 1000);
  }

  getBotMessage(question: string){
    //let answer = this.messageMap[question];
    //return answer || this.messageMap['defaultmsg'];
    let answer=this.sendDataToFlask(question)
    return answer;
  }

  sendDataToFlask(question:string) {
    const data = question;  // Your string data to send
    console.log(data);
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });

    this.http.post('http://localhost:5000/chat', data, { headers, responseType: 'text' })
        .subscribe((response) => {
            console.log(response);
            return response
        }, (error) => {
            console.error(error);
        });
      return "Some Error Occured";
}*/

getBotAnswer(msg: string) {
  const userMessage = new Message('user', msg);
  this.conversation.next([userMessage]);
  
  this.sendDataToFlask(msg)
    .subscribe((response) => {
      console.log(response);
      const botMessage = new Message('bot', response);
      this.conversation.next([botMessage]);
    }, (error) => {
      console.error(error);
      const botErrorMessage = new Message('bot', "Some Error Occured");
      this.conversation.next([botErrorMessage]);
    });
}

sendDataToFlask(question: string): Observable<string> {
  const data = question;
  const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });

  return this.http.post('https://abhashk009.pythonanywhere.com/chat', data, { headers, responseType: 'text' });
}
}
