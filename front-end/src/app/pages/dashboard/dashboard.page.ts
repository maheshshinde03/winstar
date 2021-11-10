import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { UserService } from '../../services/user.service'

import { User } from '../../interfaces/user';
import { Game } from '../../interfaces/game'
import { Network } from '@ionic-native/network/ngx';
import { AlertController , Platform} from '@ionic/angular';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  users: User;
  games: Game;
  games1: Game;
  frangames: Game;

  constructor(
    private authService:AuthenticationService,
    private localNotifications: LocalNotifications,
    private userService: UserService,
    private router: Router,
    private network: Network,
    private plt: Platform,
    private alertCtrl:AlertController,
  ) { 

    this.plt.ready().then(() =>{
      this.localNotifications.on('click').subscribe(res =>{
      let msg = res.data ? res.data.mydata: '';
      this.showAlert(res.title,res.text,msg);
      });

      this.localNotifications.on('trigger').subscribe(res =>{
        let msg = res.data ? res.data.mydata: '';
        this.showAlert(res.title,res.text,msg);
      });
    })

    // this.localNotifications.schedule({
    //   id:1,
    //   title:'Alert!!! ',
    //   text:'5 Minuts to left submit your final game points',
    //   data:{mydata:'My hidden message this is'},
    //   trigger:{in:3,unit:ELocalNotificationTriggerUnit.SECOND},
    //   foreground:true
    // });
  }

  async ngOnInit() {
    

}

doRefresh(event) {
  console.log('Begin async operation');

  setTimeout(() => {
    this.ionViewWillEnter();
    // console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
}

  async ionViewWillEnter() {

    
    
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

  (await this.authService.getUser()).subscribe(response =>{
    this.users = response
    //console.log(Response);
});


(await this.authService.last_win_game_details()).subscribe(response =>{
  console.log(response);
  this.games = response
  //console.log(Response);
});

(await this.authService.fran_last_win_game_details()).subscribe(response =>{
  console.log(response);
  this.frangames = response
  //console.log(Response);
});

this.CheckInternateConnection();
}

async CheckInternateConnection(){
  if(this.network.type === 'none')
  {
    const alert = await this.alertCtrl.create({
      cssClass: 'alert-danger',
      header: 'Warning',
      mode:'ios',
      message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Internet connection lost.</strong>`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            navigator['app'].exitApp();
            // this.navCtrl.navigateRoot('/tabs-menu/newgame');
          }
        }]        
    });
    await alert.present();
    // alert(network.type +  ' ' +'Internet connection lost ');
  }
}

showAlert(header,sub,msg){
  this.alertCtrl.create({
    header:header,
    subHeader:sub,
    message:msg,
    mode:'ios',
    buttons:[
      {
        text: 'OK',
        handler: () => {
         
          this.router.navigateByUrl('/tabs-menu/newgame', { replaceUrl: true });
        }
      }]
  })
  }
}
