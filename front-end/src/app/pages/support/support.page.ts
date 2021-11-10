import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

import { UserService } from '../../services/user.service'

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  user: any;
  chat: string;
  unsubscribe: any;
  messages: any = [];
  chatKeys: any = [];
  userType: string;
  loader: boolean = true;

  currentUser = 'admin';
  newMsg= '';
  set_margin:true;


  @ViewChild(IonContent) content: IonContent
  email: any;
  constructor(
    private authservice: AuthenticationService,
    private chatservice: FirebaseService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  async ngOnInit() {
   
  }


  async ionViewWillEnter(){
    this.content.scrollToBottom();
    (await this.authservice.getUser()).subscribe(response =>{
      this.email = response[0].email;
      this.email = response[0].email.substring(0, response[0].email.indexOf('@')).toLowerCase()
      console.log(this.email);
      this.chatservice.db.collection("chatRoom").where("id", "==",  this.email) 
      .onSnapshot((querySnapshot)=> {
        this.loader = false;
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            let data = doc.data();
            data.type = data.type == this.userType;
            console.log(data.type);
            console.log(data.id);

            if(this.chatKeys.indexOf(data.key) < 0){
              this.messages.push(data);
              this.chatKeys.push(data.key);

            }
            console.log(doc.data());
        });
        this.messages.sort(this.sortDate);
    });
  });
  this.userType = this.chatservice.admin ? 'admin' : 'user';
  }

  sortDate(a, b) {  
    var dateA = new Date(a.timestamp.toDate()); 
    var dateB = new Date(b.timestamp.toDate()); 
    return dateA > dateB ? 1 : -1;  
  };

  sendMessage() {
    this.chatservice.addChatMessage(this.email,this.newMsg,this.userType).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }

  // getChat() {
  //   console.log('get chat', this.user.id);
  //   return this.chatservice.db.collection("chatRoom").where("id", "==", this.user.id) 
  //   .onSnapshot((querySnapshot)=> {
  //       this.loader = false;
  //       querySnapshot.forEach((doc)=> {
  //           // doc.data() is never undefined for query doc snapshots
  //           let data = doc.data();
  //           data.type = data.type == this.userType;
  //           console.log(data.type);
  //           console.log(data.id);

  //           if(this.chatKeys.indexOf(data.key) < 0){
  //             this.messages.push(data);
  //             this.chatKeys.push(data.key);

  //           }
  //           console.log(doc.data());
  //       });
  //       // this.messages.sort(this.sortDate);
  //   });
  // }
   
  // messages = [
  //   {
  //     user: 'admin',
  //     createdAt: 155409085600,
  //     msg:'hey whats up mate?'
  //   },
  //   {
  //     user: 'mahesh',
  //     createdAt: 155409085600,
  //     msg:'hi, how are you?'
  //   },
  //   {
  //     user: 'admin',
  //     createdAt: 155409085600,
  //     msg:'better?'
  //   },
  // ];

  
  // sendMessage(){
  //   this.messages.push({
  //    user: 'mahesh',
  //    createdAt: new Date().getTime(),
  //    msg: this.newMsg
  //   });

  //   this.newMsg = '';
  //   setTimeout(() =>{
  //     this.content.scrollToBottom(200);
  //   });
    
  // }

  
}
