import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database"

import { Router } from '@angular/router';


const config = {

  apiKey: "AIzaSyD9JWqWrWPa3oKwBvuAWW94ZZhm0NRkU9k",
  authDomain: "winstar-game.firebaseapp.com",
  databaseURL: "https://winstar-game-default-rtdb.firebaseio.com",
  projectId: "winstar-game",
  storageBucket: "winstar-game.appspot.com",
  messagingSenderId: "483491243686",
  appId: "1:483491243686:web:7c9d78dd24c46bdc7ff667"
  
}; 

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  loader: boolean = false;
  user: any;
  db: any;
  firebase_database:any;
  admin: boolean = false;

  constructor(private router: Router) { }

  configApp() {
    firebase.initializeApp(config);
    this.db = firebase.firestore();
    this.firebase_database = firebase.database();
  }


  signUp({first_name, email, password }) {
    console.log(first_name);
    // var franchiseId = 'Fid-02'
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user)=>{
      this.loader = false;

      this.user = {
        name: first_name,
        id: email.substring(0, email.indexOf('@')).toLowerCase()
      };
      localStorage.setItem('loggedIn', this.user.id); 
      
      // create user list on firebase
      this.db.collection("users").doc(this.user.id).set({
        name: first_name,
        id: this.user.id
      });

      // this.router.navigate(['/chat/'], { queryParams: { name: 'Messenger', id: this.user.id }, skipLocationChange: false })
      console.log('register', user);
      console.log(this.user.id);

    })
    .catch((error)=> {
      // Handle Errors here.
      this.loader = false;
      console.log('error while signup', error);
      // ...
    });
  }


  addChatMessage(id: string, msg: string, type: string) {
    let key = this.generateRandomString(16);
    return this.db.collection("chatRoom/").doc(key).set({
          type: type,
          // from:this.user.id,
          id: id,
          key: key,
          msg: msg,
          is_read:'F',
          // createdAt: firebase.firestore.FieldValue.serverTimestamp()
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          // date: DateTime.toIso8601String().toString()
    });
  }

  // sendMsg(id: string, msg: string, type: string) {
  //   let key = this.generateRandomString(16);
  //   this.db.collection("chatRoom/").doc(key).set({
  //         type: type,
  //         id: id,
  //         key: key,
  //         msg: msg,
  //         timestamp: firebase.firestore.FieldValue.serverTimestamp()
  //   });
    
  // }

  generateRandomString(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  getAll
}
