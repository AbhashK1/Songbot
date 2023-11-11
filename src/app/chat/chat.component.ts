import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Message,ChatService } from '../chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('conversationRef') conversationElement: ElementRef | undefined;
  messages:Message[]=[];
  value: any;

  constructor(public chatService:ChatService){}

  scrollToBottom() {
    if (this.conversationElement) {
      this.conversationElement.nativeElement.scrollTop = this.conversationElement.nativeElement.scrollHeight;
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.chatService.conversation.subscribe((val)=>{
      this.messages=this.messages.concat(val);
    })
  }

  sendMessage(){
    if(this.value.toLowerCase()==='clear')
    {
      this.messages=[];
      this.value="";
    }
    else if(this.value.trim()===""){
      this.value=this.value.trim();
    }
    else{
    this.chatService.getBotAnswer(this.value);
    this.value='';
    }
  }

}
