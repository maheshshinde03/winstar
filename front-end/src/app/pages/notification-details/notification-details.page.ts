import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Notifications } from'../../interfaces/notifications';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service'


@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.page.html',
  styleUrls: ['./notification-details.page.scss'],
})
export class NotificationDetailsPage implements OnInit {


  id: Notifications;
  notoficationDetails: any;

  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    ) { }

     ionViewWillEnter() {
        this.ngOnInit();
  }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(data =>{
      this.id = data.id;
    });

    this.authService.view_notification(this.id).subscribe(notifyData =>{
     this.notoficationDetails = notifyData;
    // console.log(notifyData)
    });

    this.authService.update__notification_flag(this.id).subscribe(notifyData =>{
     
     });
  }


}
