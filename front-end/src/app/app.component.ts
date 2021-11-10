import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { Autostart } from '@ionic-native/autostart/ngx';
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { NetworkProviderService } from './providers/network-provider.service'
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private localNotifications: LocalNotifications,
    // private platform: Platform,
    private fire:FirebaseService,
    private alertCtrl:AlertController,
    private SplashScreen:SplashScreen,
    private network: Network,
    private util:NetworkProviderService,
    // private autostart: Autostart,
    // private backgroundMode: BackgroundMode,
    private router: Router,
    ) {

      

      // this.platform.ready().then(async () => {
      //   // this.backgroundMode.enable();
      //   // this.autostart.enable();

        

        

       
      // });
    
    this.fire.configApp();

  }



  // initializeApp() {

  // }


  
}
