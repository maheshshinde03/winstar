import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { UserService } from '../../services/user.service'

import  { User } from '../../interfaces/user'
import { ModalController } from '@ionic/angular';
import { SupportPage } from '../support/support.page';
@Component({
  selector: 'app-tabs-menu',
  templateUrl: './tabs-menu.page.html',
  styleUrls: ['./tabs-menu.page.scss'],
})
export class TabsMenuPage implements OnInit {
  users: User;

  constructor( private router: Router,
               private authService: AuthenticationService, 
               private userService: UserService,
               private modalController: ModalController,
    ) { }



  async ngOnInit() {
    (await this.authService.getUser()).subscribe(response =>{
      this.users = response
      //console.log(Response);
  })
}


// async open_support(){
//   const modal = await this.modalController.create({
//     component:  SupportPage,
//     cssClass: 'my-custom-class', 
//     componentProps: {

//     }
//   });
  
//   modal.onDidDismiss()
//     .then(async (data) => {

//   });
//   return await modal.present();
  
// }




  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
