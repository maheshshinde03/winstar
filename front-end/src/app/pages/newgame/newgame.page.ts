import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, NavController, NavParams, Platform } from '@ionic/angular';
 import { AlertController } from '@ionic/angular';
 import { NgForm } from '@angular/forms';
//import { ControllerPage } from '../controller/controller.page';
import { PointsModalPage } from '../points-modal/points-modal.page';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

import * as moment from 'moment';
import { Plugins } from '@capacitor/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Network } from '@ionic-native/network/ngx';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';
// import { Autostart } from '@ionic-native/autostart/ngx';

import { Subscription, interval } from 'rxjs';
import { first } from 'rxjs/operators';

const { Storage } = Plugins;

const IMG_1_token = 'img_1';
const IMG_2_token = 'img_2';
const IMG_3_token = 'img_3';
const IMG_4_token = 'img_4';
const IMG_5_token = 'img_5';
const IMG_6_token = 'img_6';
const IMG_7_token = 'img_7';
const IMG_8_token = 'img_8';
const IMG_9_token = 'img_9';
const IMG_10_token = 'img_10';
const IMG_11_token = 'img_11';

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.page.html',
  styleUrls: ['./newgame.page.scss'],
})
export class NewgamePage implements OnInit {
  fire_game_status: any;
  
  private subscription!: Subscription;

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.ionViewWillEnter();
      // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
  date: any = new Date().toISOString();
  //today: Date = new Date();
  today= moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  game_points: FormGroup;
  game_status:any;
  users:any;
  gameids:any;
  gameimgs:any;
  current_game_amounts: any;
  g_deposit_percent10:any

  public dateNow = new Date();   
  //public dDay = new Date('Jan 01 2022 00:00:00');

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  timeDifference:any;
  secondsToDday:any;
  minutesToDday:any;
  hoursToDday:any;
  daysToDday:any;
  date1:any
  newDateObj:any

  gametimes:any;

  async ngOnInit(): Promise<void> {
    this.game_points = this.fb.group({

      img_1:['',[Validators.required]],
      img_2:['',[Validators.required]],
      img_3:['',[Validators.required]],
      img_4:['',[Validators.required]],
      img_5:['',[Validators.required]],
      img_6:['',[Validators.required]],
      img_7:['',[Validators.required]],
      img_8:['',[Validators.required]],
      img_9:['',[Validators.required]],
      img_10:['',[Validators.required]],
      img_11:['',[Validators.required]],
      // img_0:['',[Validators.required]],
      fran_id:['',[Validators.required]],
      game_id:['',[Validators.required]],
      total:['',[Validators.required]],
      date_time:[ this.today ],
 
    });

    this.subscription = interval(1000)
    .subscribe(x => { this.getTimeDifference(); });

    this.gametimes = await (await this.auth.get_current_game_time()).pipe(first()).toPromise();
    this.date =  moment(this.gametimes[0].date_time).add(8, 'm').format('LLL');
  }

  private getTimeDifference () {
    //var newdt =  moment(this.date).format('LLL');
    //console.log(newdt);

    this.newDateObj = new Date(this.date);

    //this.newDateObj = moment(newdt).add(45, 'm').format('LLL');
    //console.log(this.newDateObj)
    // this.timeDifference = this.dDay.getTime() - new Date().getTime();
     this.timeDifference = this.newDateObj.getTime() - new Date().getTime();
    // console.log(this.timeDifference)
     this.allocateTimeUnits(this.timeDifference);
 }

 private allocateTimeUnits (timeDifference: any) {
     //console.log(this.date)
   if(new Date(this.date) < new Date() || this.date==undefined)
   {
    // console.log(this.timeDifference)
    this.minutesToDday = '00';
    this.secondsToDday = '00';
   }

   else{
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
   }
   
}


  data1:any=0;
  data2:any=0;
  data3:Number=0;
  data4:Number=0;
  data5:Number=0;
  data6:Number=0;
  data7:Number=0;
  data8:Number=0;
  data9:Number=0;
  data10:Number=0;
  data11:Number=0;


  data_for_cal1:any=0;
  data_for_cal2:any=0;
  data_for_cal3:any=0;
  data_for_cal4:any=0;
  data_for_cal5:any=0;
  data_for_cal6:any=0;
  data_for_cal7:any=0;
  data_for_cal8:any=0;
  data_for_cal9:any=0;
  data_for_cal10:any=0;
  data_for_cal11:any=0;


  data_for_show1:Number=0;
  data_for_show2:Number=0;
  data_for_show3:Number=0;
  data_for_show4:Number=0;
  data_for_show5:Number=0;
  data_for_show6:Number=0;
  data_for_show7:Number=0;
  data_for_show8:Number=0;
  data_for_show9:Number=0;
  data_for_show10:Number=0;
  data_for_show11:Number=0;
  // data0=0;
  total:number;
  total_token_value=[];
 
  data:any;
  no:any;


  constructor(
    private fb:FormBuilder,
    private localNotifications: LocalNotifications,
    private loadingController:LoadingController,
    private alertCtrl:AlertController,
    private modalController: ModalController,
    private auth:AuthenticationService,
    private navCtrl:NavController,
    private fire_service: FirebaseService,
    private network: Network,
    private platform: Platform,
    public router:Router,
    // private autostart: Autostart,
    // private backgroundMode: BackgroundMode
    ) {  
    console.log(this.today) ;
    
    this.platform.ready().then(() =>{
      this.localNotifications.on('click').subscribe(res =>{
      let msg = res.data ? res.data.mydata: '';
      this.showAlert(res.title,res.text,msg);
      });

      this.localNotifications.on('trigger').subscribe(res =>{
        let msg = res.data ? res.data.mydata: '';
        this.showAlert(res.title,res.text,msg);
      });
    })
    this.localNotifications
    this.sceduleNotification();
  }

  sceduleNotification(){

    this.localNotifications.schedule({
      id:1,
      title:'Attention',
      text:'My Notification',
      data:{mydata:'My hidden message this is'},
      icon: "assets/img/bell.png",
          // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          smallIcon: "assets/img/bell.png",
          color: '#ac9fa9',
          lockscreen: true,
          vibrate: true,
          launch: true,
          // foreground: true,
          wakeup: true,
          led: '#ff00c3',
      trigger:{in:5,unit:ELocalNotificationTriggerUnit.SECOND},
      foreground:true
    })

  }

  showAlert(header,sub,msg){
    this.alertCtrl.create({
      header:header,
      subHeader:sub,
      message:msg,
      buttons:['OK']
    }).then(alert => alert.present());
  }

  onInput($event:any) {
    let theEvent = $event || window.event,
        key = theEvent.target.value,
        regex = /[0-9]+/g
    if( !regex.test(key) ) {
      let resp = $event.target.value.match(regex)
      $event.target.value = resp ? resp.join('')  : ''
    }
   }

  async ionViewWillEnter() {
 this.fire_service.firebase_database.ref('/game_status/123').on('value', resp => {
  console.log(resp.val().game_process_status)
  this.fire_game_status = resp.val().game_process_status;
});


    (await this.auth.get_compony_m_status()).subscribe(response =>{
      this.game_status = response
      console.log(this.game_status);
  });

    (await this.auth.getUser()).subscribe(response =>{
      this.users = response
      this.g_deposit_percent10 = response[0].fran_game_deposit
      console.log(response);
  });

  (await this.auth.current_game_id()).subscribe(response =>{
    this.gameids = response
    //console.log(Response);
});

// (await this.auth.get_current_gameImg_amount()).subscribe(response =>{
//   this.current_game_amounts = response
//   //console.log(Response);
// });

Storage.get({ key: IMG_1_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data1 = parseInt(item.value),
    this.data_for_cal1 = parseInt(item.value)
    console.log(this.data1)
  }else{
    this.data1 = 0;
    this.data_for_cal1 = 0;
  }
})

Storage.get({ key: IMG_2_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data2 = parseInt(item.value),
    this.data_for_cal2 = parseInt(item.value)

    console.log(this.data2)
  }else{
    this.data2 = 0;
    this.data_for_cal2 = 0

  }
})

Storage.get({ key: IMG_3_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data3 = parseInt(item.value),
    this.data_for_cal3 = parseInt(item.value)

    console.log(this.data3)
  }else{
    this.data3 = 0;
    this.data_for_cal3 = 0;

  }
})


Storage.get({ key: IMG_4_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data4 = parseInt(item.value),
    this.data_for_cal4 = parseInt(item.value)

    console.log(this.data4)
  }else{
    this.data4 = 0;
    this.data_for_cal4 = 0;

  }
})


Storage.get({ key: IMG_5_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data5 = parseInt(item.value),
    this.data_for_cal5 = parseInt(item.value)

    console.log(this.data1)
  }else{
    this.data5 = 0;
    this.data_for_cal5 = 0;

  }
})


Storage.get({ key: IMG_6_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data6 = parseInt(item.value),
    this.data_for_cal6 = parseInt(item.value)

    console.log(this.data1)
  }else{
    this.data6 = 0;
    this.data_for_cal6 = 0;

  }
})


Storage.get({ key: IMG_7_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data7 = parseInt(item.value),
    this.data_for_cal7 = parseInt(item.value)

    console.log(this.data7)
  }else{
    this.data7 = 0;
    this.data_for_cal7 = 0;

  }
})


Storage.get({ key: IMG_8_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data8 = parseInt(item.value),
    this.data_for_cal8 = parseInt(item.value)

    console.log(this.data8)
  }else{
    this.data8 = 0;
    this.data_for_cal8 = 0;

  }
})


Storage.get({ key: IMG_9_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data9 = parseInt(item.value),
    this.data_for_cal9 = parseInt(item.value)

    console.log(this.data9)
  }else{
    this.data9 = 0;
    this.data_for_cal9 = 0

  }
})


Storage.get({ key: IMG_10_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data10 = parseInt(item.value),
    this.data_for_cal10 = parseInt(item.value)

    console.log(this.data10)
  }else{
    this.data10 = 0;
    this.data_for_cal10 = 0

  }
});


Storage.get({ key: IMG_11_token }).then(item => {
  if (item && item.value) {
    // var return_img1_value = item.value
    this.data11 = parseInt(item.value),
    this.data_for_cal11 = parseInt(item.value)

    console.log(this.data11)
  }else{
    this.data11 = 0;
    this.data_for_cal11 = 0;

  }
});



(await this.auth.get_current_gameImg_amount()).subscribe(response =>{
  this.gameimgs = response
  console.log(response);
  console.log(this.gameimgs[0] == null);
  

  if(this.gameimgs[0] == null){
    this.data_for_show1 = 0;
    this.data_for_show2 = 0;
    this.data_for_show3 = 0;
    this.data_for_show4 = 0;
    this.data_for_show5 = 0;
    this.data_for_show6 = 0;
    this.data_for_show7 = 0;
    this.data_for_show8 = 0;
    this.data_for_show9 = 0;
    this.data_for_show10 = 0;
    this.data_for_show11 = 0; 

    // this.data1 = 0;
    // this.data2 = 0;
    // this.data3 = 0;
    // this.data4 = 0;
    // this.data5 = 0;
    // this.data6 = 0;
    // this.data7 = 0;
    // this.data8 = 0;
    // this.data9 = 0;
    // this.data10 = 0;
    // this.data11 = 0; 
  }
  else{
    this.data_for_show1 = this.gameimgs[0].img_1_amount;
    this.data_for_show2 = this.gameimgs[0].img_2_amount;
    this.data_for_show3 = this.gameimgs[0].img_3_amount;
    this.data_for_show4 = this.gameimgs[0].img_4_amount;
    this.data_for_show5 = this.gameimgs[0].img_5_amount;
    this.data_for_show6 = this.gameimgs[0].img_6_amount;
    this.data_for_show7 = this.gameimgs[0].img_7_amount;
    this.data_for_show8 = this.gameimgs[0].img_8_amount;
    this.data_for_show9 = this.gameimgs[0].img_9_amount;
    this.data_for_show10 = this.gameimgs[0].img_10_amount;
    this.data_for_show11 = this.gameimgs[0].img_11_amount;

    // this.data1 = this.gameimgs[0].img_1_amount;
    // this.data2 = this.gameimgs[0].img_2_amount;
    // this.data3 = this.gameimgs[0].img_3_amount;
    // this.data4 = this.gameimgs[0].img_4_amount;
    // this.data5 = this.gameimgs[0].img_5_amount;
    // this.data6 = this.gameimgs[0].img_6_amount;
    // this.data7 = this.gameimgs[0].img_7_amount;
    // this.data8 = this.gameimgs[0].img_8_amount;
    // this.data9 = this.gameimgs[0].img_9_amount;
    // this.data10 = this.gameimgs[0].img_10_amount;
    // this.data11 = this.gameimgs[0].img_11_amount;
  }
});


}


// showAlert(header,sub,msg){
// this.alertCtrl.create({
//   header:header,
//   subHeader:sub,
//   message:msg,
//   mode:'ios',
//   buttons:[
//     {
//       text: 'OK',
//       handler: () => {
       
//         this.ionViewWillEnter();
//       }
//     }]
// })
// }


add_number_img(){
  let ttl = this.data_for_cal1 + this.data_for_cal2 + this.data_for_cal3 + this.data_for_cal4 + this.data_for_cal5 + this.data_for_cal6 + this.data_for_cal7 + this.data_for_cal8 + this.data_for_cal9 + this.data_for_cal10  + this.data_for_cal11;
  console.log(ttl);
  return ttl;
}

  async modals1(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class', 
      componentProps: {
        // response: response,
        'model_title': "Elephant",
        'image_no':'1',
        'pre_points' : this.data1,
      }
    });
    
    modal.onDidDismiss()
      .then(async (data) => {
        this.data_for_cal1 = parseInt(data.data)
        let a = this.add_number_img();
        console.log(a)
        let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
            {
                from(Storage.set({key: IMG_1_token, value: data.data}));
                Storage.get({ key: IMG_1_token }).then(async item => {
                if (item && item.value) {
                // let a = this.add_number_img();
                // console.log(a)
                this.data1 = parseInt(item.value);
                // console.log(this.data1)
                }
              })
            }else{
                const alert =  this.alertCtrl.create({
                // cssClass: 'alert-warning',
                header:'warning',
                mode:'ios',
                message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
                buttons:[
                  {
                    text: 'OK',
                    handler: () => {
                     
                      Storage.get({ key: IMG_1_token }).then(async item => {
                        if (item && item.value) {
                        this.data1 = parseInt(item.value);
                        this.data_for_cal1 = parseInt(item.value);

                        }
                      })
                    }
                  }],
              });
               (await alert).present();
            }
    });
    return await modal.present();
    
  }




  async modals2(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Turtle",
        'image_no':'2',
        'pre_points' :this.data2
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {

      this.data_for_cal2 = parseInt(data.data)
      let a = this.add_number_img();
      console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
      // console.log( g_deposit_p_10)
      if(this.add_number_img() <= g_deposit_p_10)
            {
                from(Storage.set({key: IMG_2_token, value: data.data}));
                Storage.get({ key: IMG_2_token }).then(async item => {
                if (item && item.value) {
                // let a = this.add_number_img();
                // console.log(a)
                this.data2 = parseInt(item.value);
                // console.log(this.data1)
                }
              })
            }else{
                const alert =  this.alertCtrl.create({
                // cssClass: 'alert-warning',
                header:'warning',
                mode:'ios',
                message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
                buttons:[
                  {
                    text: 'OK',
                    handler: () => {
                     
                      Storage.get({ key: IMG_2_token }).then(async item => {
                        if (item && item.value) {
                        this.data2 = parseInt(item.value);
                        this.data_for_cal2 = parseInt(item.value);
                        
                        }
                      })
                    }
                  }],
              });
               (await alert).present();
            }

  });
    
    return await modal.present();
    
  }

  async modals3(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Rabbit",
        'image_no':'3',
        'pre_points' : this.data3
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      
      this.data_for_cal3 = parseInt(data.data)
      let a = this.add_number_img();
      console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
      // console.log( g_deposit_p_10)
      if(this.add_number_img() <= g_deposit_p_10)
            {
                from(Storage.set({key: IMG_3_token, value: data.data}));
                Storage.get({ key: IMG_3_token }).then(async item => {
                if (item && item.value) {
                // let a = this.add_number_img();
                // console.log(a)
                this.data3 = parseInt(item.value);
                // console.log(this.data1)
                }
              })
            }else{
                const alert =  this.alertCtrl.create({
                // cssClass: 'alert-warning',
                header:'warning',
                mode:'ios',
                message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
                buttons:[
                  {
                    text: 'OK',
                    handler: () => {
                     
                      Storage.get({ key: IMG_3_token }).then(async item => {
                        if (item && item.value) {
                        this.data3 = parseInt(item.value);
                        this.data_for_cal3 = parseInt(item.value);

                        }
                      })
                    }
                  }],
              });
               (await alert).present();
            }
  });
    
    return await modal.present();
    
  }
  async modals4(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Lion",
        'image_no':'4',
        'pre_points' : this.data4
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      this.data_for_cal4= parseInt(data.data)
      let a = this.add_number_img();
              console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
          {
              from(Storage.set({key: IMG_4_token, value: data.data}));
              Storage.get({ key: IMG_4_token }).then(async item => {
              if (item && item.value) {
              // let a = this.add_number_img();
              // console.log(a)
              this.data4 = parseInt(item.value);
              // console.log(this.data1)
              }
            })
          }else{
              const alert =  this.alertCtrl.create({
              // cssClass: 'alert-warning',
              header:'warning',
              mode:'ios',
              message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                   
                    Storage.get({ key: IMG_4_token }).then(async item => {
                      if (item && item.value) {
                      this.data4 = parseInt(item.value);
                      this.data_for_cal4 = parseInt(item.value);

                      }
                    })
                  }
                }],
            });
             (await alert).present();
          }
  });
    
    return await modal.present();
    
  }
  async modals5(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Car",
        'image_no':'5',
        'pre_points' : this.data5,
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      this.data_for_cal5 = parseInt(data.data)
      let a = this.add_number_img();
              console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
          {
              from(Storage.set({key: IMG_5_token, value: data.data}));
              Storage.get({ key: IMG_5_token }).then(async item => {
              if (item && item.value) {
              // let a = this.add_number_img();
              // console.log(a)
              this.data5 = parseInt(item.value);
              // console.log(this.data1)
              }
            })
          }else{
              const alert =  this.alertCtrl.create({
              // cssClass: 'alert-warning',
              header:'warning',
              mode:'ios',
              message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                   
                    Storage.get({ key: IMG_5_token }).then(async item => {
                      if (item && item.value) {
                      this.data5 = parseInt(item.value);
                      this.data_for_cal5 = parseInt(item.value);

                      }
                    })
                  }
                }],
            });
             (await alert).present();
          }
  });
    
    return await modal.present();
    
  }
  async modals6(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Aeroplane",
        'image_no':'6',
        'pre_points' : this.data6
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      
      this.data_for_cal6 = parseInt(data.data)
      let a = this.add_number_img();
              console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
          {
              from(Storage.set({key: IMG_6_token, value: data.data}));
              Storage.get({ key: IMG_6_token }).then(async item => {
              if (item && item.value) {
              // let a = this.add_number_img();
              // console.log(a)
              this.data6 = parseInt(item.value);
              // console.log(this.data1)
              }
            })
          }else{
              const alert =  this.alertCtrl.create({
              // cssClass: 'alert-warning',
              header:'warning',
              mode:'ios',
              message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                   
                    Storage.get({ key: IMG_6_token }).then(async item => {
                      if (item && item.value) {
                      this.data6 = parseInt(item.value);
                      this.data_for_cal6 = parseInt(item.value);

                      }
                    })
                  }
                }],
            });
             (await alert).present();
          }
  });
    
    return await modal.present();
    
  }

  async modals7(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Ship",
        'image_no':'7',
        'pre_points' : this.data7
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      this.data_for_cal7 = parseInt(data.data)
      let a = this.add_number_img();
              console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
          {
              from(Storage.set({key: IMG_7_token, value: data.data}));
              Storage.get({ key: IMG_7_token }).then(async item => {
              if (item && item.value) {
              // let a = this.add_number_img();
              // console.log(a)
              this.data7 = parseInt(item.value);
              // console.log(this.data1)
              }
            })
          }else{
              const alert =  this.alertCtrl.create({
              // cssClass: 'alert-warning',
              header:'warning',
              mode:'ios',
              message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                   
                    Storage.get({ key: IMG_7_token }).then(async item => {
                      if (item && item.value) {
                      this.data7 = parseInt(item.value);
                      this.data_for_cal7 = parseInt(item.value);

                      }
                    })
                  }
                }],
            });
             (await alert).present();
          }
  });
    
    return await modal.present();
    
  }

  async modals8(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Tree",
        'image_no':'8',
        'pre_points' : this.data8
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      

      this.data_for_cal8 = parseInt(data.data)
      let a = this.add_number_img();
              console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
          {
              from(Storage.set({key: IMG_8_token, value: data.data}));
              Storage.get({ key: IMG_8_token }).then(async item => {
              if (item && item.value) {
              // let a = this.add_number_img();
              // console.log(a)
              this.data8 = parseInt(item.value);
              // console.log(this.data1)
              }
            })
          }else{
              const alert =  this.alertCtrl.create({
              // cssClass: 'alert-warning',
              header:'warning',
              mode:'ios',
              message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                   
                    Storage.get({ key: IMG_8_token }).then(async item => {
                      if (item && item.value) {
                      this.data8 = parseInt(item.value);
                      this.data_for_cal8 = parseInt(item.value);

                      }
                    })
                  }
                }],
            });
             (await alert).present();
          }
  });
    
    return await modal.present();
    
  }
  async modals9(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Sun",
        'image_no':'9',
        'pre_points' : this.data9
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      

      this.data_for_cal9 = parseInt(data.data)
      let a = this.add_number_img();
              console.log(a)
     let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
          {
              from(Storage.set({key: IMG_9_token, value: data.data}));
              Storage.get({ key: IMG_9_token }).then(async item => {
              if (item && item.value) {
              // let a = this.add_number_img();
              // console.log(a)
              this.data9 = parseInt(item.value);
              // console.log(this.data1)
              }
            })
          }else{
              const alert =  this.alertCtrl.create({
              // cssClass: 'alert-warning',
              header:'warning',
              mode:'ios',
              message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                   
                    Storage.get({ key: IMG_9_token }).then(async item => {
                      if (item && item.value) {
                      this.data9 = parseInt(item.value);
                      this.data_for_cal9 = parseInt(item.value);

                      }
                    })
                  }
                }],
            });
             (await alert).present();
          }
  });
    
    return await modal.present();
    
  }

  async modals10(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Banana",
        'image_no':'10',
        'pre_points' : this.data10
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      this.data_for_cal10 = parseInt(data.data)
      let a = this.add_number_img();
              console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
          {
              from(Storage.set({key: IMG_10_token, value: data.data}));
              Storage.get({ key: IMG_10_token }).then(async item => {
              if (item && item.value) {
              // let a = this.add_number_img();
              // console.log(a)
              this.data10 = parseInt(item.value);
              // console.log(this.data1)
              }
            })
          }else{
              const alert =  this.alertCtrl.create({
              // cssClass: 'alert-warning',
              header:'warning',
              mode:'ios',
              message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                   
                    Storage.get({ key: IMG_10_token }).then(async item => {
                      if (item && item.value) {
                      this.data10 = parseInt(item.value);
                      this.data_for_cal10 = parseInt(item.value);

                      }
                    })
                  }
                }],
            });
             (await alert).present();
          }
  });
    
    return await modal.present();
    
  }

  async modals11(){
    const modal = await this.modalController.create({
      component:  PointsModalPage,
      cssClass: 'my-custom-class',
      componentProps: {
        // response: response,
        'model_title': "Jackpot",
        'image_no':'11',
        'pre_points' : this.data11
      }
    });

    modal.onDidDismiss()
    .then(async (data) => {
      
      this.data_for_cal11 = parseInt(data.data)
      let a = this.add_number_img();
              console.log(a)
      let g_deposit_p_10 =  parseInt(this.g_deposit_percent10) + ((this.g_deposit_percent10) * (10/100));
        // console.log( g_deposit_p_10)
        if(this.add_number_img() <= g_deposit_p_10)
          {
              from(Storage.set({key: IMG_11_token, value: data.data}));
              Storage.get({ key: IMG_11_token }).then(async item => {
              if (item && item.value) {
              // let a = this.add_number_img();
              // console.log(a)
              this.data11 = parseInt(item.value);
              // console.log(this.data1)
              }
            })
          }else{
              const alert =  this.alertCtrl.create({
              // cssClass: 'alert-warning',
              header:'warning',
              mode:'ios',
              message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Your balance is Low</strong><br>`,
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                   
                    Storage.get({ key: IMG_11_token }).then(async item => {
                      if (item && item.value) {
                      this.data11 = parseInt(item.value);
                      this.data_for_cal11 = parseInt(item.value);

                      }
                    })
                  }
                }],
            });
             (await alert).present();
          }
  });
    
    return await modal.present();
    
  }



  

  get fran_id(){
    return this.game_points.get('fran_id');
  }

  get gameid(){
    return this.game_points.get('gameid');
  }

  get img_1(){
    return this.game_points.get('img_1');
  }

  get img_2(){
    return this.game_points.get('img_2');
  }

  get img_3(){
    return this.game_points.get('img_3');
  }

  get img_4(){
    return this.game_points.get('img_4');
  }

  get img_5(){
    return this.game_points.get('img_5');
  }

  get img_6(){
    return this.game_points.get('img_6');
  }

  get img_7(){
    return this.game_points.get('img_7');
  }

  get img_8(){
    return this.game_points.get('img_8');
  }

  get img_9(){
    return this.game_points.get('img_9');
  }

  get img_10(){
    return this.game_points.get('img_10');
  }

  get img_11(){
    return this.game_points.get('img_11');
  }


  async Submit_points(){
    console.log(this.game_points.value);
    console.log(this.add_number_img());


    const alert = await this.alertCtrl.create({
      cssClass: 'alert-danger',
      header: 'Confirm!',
      mode:'ios',
      message: `<img src="../../../assets/img/bell.png" class="alert-warning"><br><br><strong>Points submit only at one time</strong>`,
      buttons:[
        {
          text: 'OK',
          handler: async () => {
            if(this.add_number_img() > 0){
              const loading = await this.loadingController.create();
              await loading.present();
              (await this.auth.submit_point_data(this.game_points.value)).subscribe(
                async (res) =>{
                  await loading.dismiss();
                  const alert = await this.alertCtrl.create({
                    header:'Success',
                    mode:'ios',
                    message: `<img src="../../../assets/img/success.png" class="alert-success"><br><br><strong>Points Submit Successful</strong>`,
                    buttons:[
                      {
                        text: 'OK',
                        handler: () => {
                          Storage.remove({key: IMG_1_token});
                          Storage.remove({key: IMG_2_token});
                          Storage.remove({key: IMG_3_token});
                          Storage.remove({key: IMG_4_token});
                          Storage.remove({key: IMG_5_token});
                          Storage.remove({key: IMG_6_token});
                          Storage.remove({key: IMG_7_token});
                          Storage.remove({key: IMG_8_token});
                          Storage.remove({key: IMG_9_token});
                          Storage.remove({key: IMG_10_token});
                          Storage.remove({key: IMG_11_token});
                          // location.reload();
                          this.ionViewWillEnter();
                          // this.navCtrl.navigateRoot('/tabs-menu/newgame');
                        }
                      }],
                  });
                  await alert.present();
                },async (err) =>{
                  await loading.dismiss();
                  const alert =  this.alertCtrl.create({
                    // cssClass: 'alert-warning',
                    header:'warning',
                    mode:'ios',
                    message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>`+ err.error.message +`</strong><br>`,
                    buttons:[
                      {
                        text: 'OK',
                        handler: () => {
                           this.ionViewWillEnter();
                          // this.navCtrl.navigateRoot('/tabs-menu/newgame');
                        }
                      }],
                  });
                   (await alert).present();
                }
              )
            }
            else{
              // this.router.navigateByUrl('/tabs-menu/newgame', { replaceUrl: true });
              const alert = await this.alertCtrl.create({
                cssClass: 'alert-danger',
                header: 'Warning',
                mode:'ios',
                message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Enter At least one value.</strong>`,
                buttons: ['Cancel'],        
              });
          
              await alert.present();
            } 
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.ionViewWillEnter();
          }
        }
      ]        
    });

    await alert.present();


 
  }

  async reset(){
    

    const alert = await this.alertCtrl.create({
      cssClass: 'alert-danger',
      header: 'Warning',
      mode:'ios',
      message: `<img src="../../../assets/img/bell.png" class="alert-warning"><br><br><strong>Are you sure to clear All points.</strong>`,
      buttons:[
        {
          text: 'OK',
          handler: () => {
            Storage.remove({key: IMG_1_token});
                          Storage.remove({key: IMG_2_token});
                          Storage.remove({key: IMG_3_token});
                          Storage.remove({key: IMG_4_token});
                          Storage.remove({key: IMG_5_token});
                          Storage.remove({key: IMG_6_token});
                          Storage.remove({key: IMG_7_token});
                          Storage.remove({key: IMG_8_token});
                          Storage.remove({key: IMG_9_token});
                          Storage.remove({key: IMG_10_token});
                          Storage.remove({key: IMG_11_token});
             this.ionViewWillEnter();
            // this.navCtrl.navigateRoot('/tabs-menu/newgame');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.ionViewWillEnter();
          }
        }
      ],        
    });

    await alert.present();
    // this.data1 = 0;
    // this.data2 = 0;
    // this.data3 = 0;
    // this.data4 = 0;
    // this.data5 = 0;
    // this.data6 = 0;
    // this.data7 = 0;
    // this.data8 = 0;
    // this.data9 = 0;
    // this.data10 = 0;
    // this.data11 = 0;

    // this.data_for_show1 = this.gameimgs[0].img_1_amount;
    // this.data_for_show2 = this.gameimgs[0].img_2_amount;
    // this.data_for_show3 = this.gameimgs[0].img_3_amount;
    // this.data_for_show4 = this.gameimgs[0].img_4_amount;
    // this.data_for_show5 = this.gameimgs[0].img_5_amount;
    // this.data_for_show6 = this.gameimgs[0].img_6_amount;
    // this.data_for_show7 = this.gameimgs[0].img_7_amount;
    // this.data_for_show8 = this.gameimgs[0].img_8_amount;
    // this.data_for_show9 = this.gameimgs[0].img_9_amount;
    // this.data_for_show10 = this.gameimgs[0].img_10_amount;
    // this.data_for_show11 = this.gameimgs[0].img_11_amount;
  }
}
