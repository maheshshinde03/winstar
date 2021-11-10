import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.page.html',
  styleUrls: ['./history-details.page.scss'],
})
export class HistoryDetailsPage implements OnInit {
  
  @Input() game_id:string;
  @Input() winning_id:string;
 // @Input() response:any ={};
  response: any;
  //navParams: any;
  
  constructor(navParams: NavParams,
               public viewCtrl: ModalController,
               public modalController: ModalController
    ) {
   this.response=navParams.get('response')
  // this.response = navParams.data;
  //this.game_id = navParams.get('game_id');
  //console.log(this.game_id);
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
