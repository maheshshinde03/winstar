import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService} from 'src/app/services/authentication.service';
import { UserService } from '../../services/user.service'

import { AlertController, ModalController, Platform } from '@ionic/angular';
import { Game } from '../../interfaces/game';

import{ NotificationDetailsPage } from '../notification-details/notification-details.page'
import { HistoryDetailsPage } from '../history-details/history-details.page'
//import { Moment } from 'moment';
import * as moment from 'moment';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {


  
  private dateYesterday: Date = new Date();
  
  start_date1:any;
  end_date1:any;
  dateRang: FormGroup;

  images:any=[];

  todays:Game;
  yesterdays:Game;
  yesterday: Date = new Date();
  today: Date = new Date();
  rangs: any;
  show = 'today';
  loop:any=[];
  moment: any;
  // let dte = new Date();
  // dte.setDate(dte.getDate() - 1);
  //currentdate: Date;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    public modalController: ModalController,
    private authService: AuthenticationService,
    private userService: UserService,
    private network: Network,
    private platform: Platform,
    private alertCtrl:AlertController,
    ) { }

  async ngOnInit() {
    //  console.log(this.todays);
   
      
  }

  doRefresh(event) {
    console.log('Begin async operation');
  
    setTimeout(() => {
      this.ngOnInit();
      // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async ionViewWillEnter(){
    this.dateRang = this.formBuilder.group({         
      start_date:['',[Validators.required]],
      end_date:['',[Validators.required]],

    });

    let today ={                    
      date :(moment(new Date()).format("YYYY-MM-DD"))
    };

    let yesterday ={                 
     dateYesterday : (this.dateYesterday.setDate(this.yesterday.getDate() - 1)),
      date : moment( this.dateYesterday).format("YYYY-MM-DD")
    };


    (await this.authService.today_game_history(today)).subscribe(response =>{
     console.log(today)
     console.log('Yesterday',yesterday)

      this.todays = response
      console.log(response)
    });    

    (await this.authService.yesterday_game_history(yesterday)).subscribe(response =>{
        this.yesterdays = response
    });    

    // this.platform.ready().then(async () => {
    //   if(this.network.type === 'none')
    //   {
    //     const alert = await this.alertCtrl.create({
    //       cssClass: 'alert-danger',
    //       header: 'Warning',
    //       mode:'ios',
    //       message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Internet connection lost.</strong>`,
    //       buttons: [
    //         {
    //           text: 'OK',
    //           handler: () => {
    //             navigator['app'].exitApp();
    //             // this.navCtrl.navigateRoot('/tabs-menu/newgame');
    //           }
    //         }]        
    //     });
    //     await alert.present();
    //     // alert(network.type +  ' ' +'Internet connection lost ');
    //   }
    // });
  }

  
  get start_date(){
    return this.dateRang.get('start_date');
  }

  get end_date(){
    return this.dateRang.get('end_date');
  }

  segmentChanged(ev: any) {
    //console.log( ev.detail.value);
    this.show = ev.detail.value;
  }


  async submitdate(){
  
    let start_date1 =  moment(this.dateRang.value.start_date).format("YYYY-MM-DD");
    let end_date1 = moment(this.dateRang.value.end_date).format("YYYY-MM-DD");

     (await this.authService.date_history({start_date1, end_date1})).subscribe(response =>{
       this.rangs = response
       console.log(response);
     })

    
  }

  async openModal(response) {
    const modal = await this.modalController.create({
      component: HistoryDetailsPage,
      componentProps: { response: response }
     // componentProps: { game_id: response.game_id, winning_id:response.winning_id }
      //console.log();
      
    });
    return await modal.present();
  }

}