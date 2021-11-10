import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from 'src/app/services/authentication.service';
import { Notifications } from '../../interfaces/notifications';
import  { User } from '../../interfaces/user';
import { AlertController, Platform } from '@ionic/angular';

import { UserService } from '../../services/user.service'
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  yesterday: Date = new Date();
  today: Date = new Date();
  tomorrow: Date = new Date();
  
  notifications : Notifications;
  users: User;
  constructor(private authService: AuthenticationService,
    public alertController: AlertController,
    private userService: UserService,
    private network: Network,
    private platform: Platform,
    ) { }

  async ngOnInit() {
    console.log(this.notifications);
    
    
                          //   (await this.authService.getUser()).subscribe(response =>{
                          //     this.users = response
                          //       //console.log(response);
                          //     }),
                          //   setInterval(async ()=>{
                          //   (await this.authService.get_notifications()).subscribe(response =>{
                          //     this.notifications = response
                          //       //console.log(response);
                          //     })
                          // }, 4000);
  }


  doRefresh(event) {
    console.log('Begin async operation');
  
    setTimeout(() => {
      this.ionViewWillEnter();
      // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  async ionViewWillEnter(){
    // this.platform.ready().then(async () => {

    //   if(this.network.type === 'none')
    //   {
    //     const alert = await this.alertController.create({
    //       cssClass: 'alert-danger',
    //       header: 'Warning',
    //       mode:'ios',
    //       message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Internet connection lost.</strong>`,
    //       buttons: [
    //         {
              
    //           text: 'OK',
    //           handler: () => {
    //             navigator['app'].exitApp();
    //           }
    //         }]        
    //     });
    
    //     await alert.present();
    //   }
    // });
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    (await this.authService.getUser()).subscribe(response =>{
          this.users = response
            //console.log(response);
          }),

          (await this.authService.get_notifications()).subscribe(response =>{
                this.notifications = response
                  console.log(response);
                })
  }


  getFormatedTime(dateString){
    var date = new Date(dateString);
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "pm" : "am";
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let time = hours + ":" + minutes + " " + am_pm;
    return time;
 }
}
