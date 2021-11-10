import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRadioGroup, ModalController, NavController, Platform } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
// import * as $ from "jquery";
declare var $: any;

@Component({
  selector: 'app-points-modal',
  templateUrl: './points-modal.page.html',
  styleUrls: ['./points-modal.page.scss'],
})
export class PointsModalPage implements OnInit {

  a;
  sum;
  subEle;
  sub;
  storeArray = []
  NoArr = [];
  finalarr;
  s:any = 0;
  selectedRadioGroup: any = "addNumber";
  sa: any;
  value:any;
  constructor(
    private modalController: ModalController, 
    private router: Router,
    private alertCtrl:AlertController,
    private navParams: NavParams,
    private platform : Platform) { 
      this.platform.backButton.subscribe(() => {
        this.emptydata = this.navParams.get('pre_points');

        this.modalController.dismiss(this.emptydata)
      });
    }

  @ViewChild('radioGroup') radioGroup: IonRadioGroup

  ngOnInit() {
    switch (this.operators) {
      case "addNumber": {
        console.log("addNumber grpchng")
        // this.radioSelect1(event);
        this.s = this.s + this.a
        break;
      }
      case "subNumber": {
        console.log("subNumber grpchng")
        // this.radioSelect2(event);
        this.s = this.s - this.a
        break;
      }
      // case "inputvalue": {
      //   console.log("inputvalue grpchng")
      //   // this.radioSelect2(event);
      //   this.s = this.s
      //   break;
      // }
      default: {
        console.log('ERROR: Invalid Value: ');
        break;
      }
    }
  }

  @Input()
  numberrrr: any;
  data: any;
  emptydata: 0;
  operators: any = "addNumber";
  numberN = [100, 200, 300, 400, 500, 600, 700, 800, 900,
    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
    10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
    100000
  ];


  radioGroupChange(event) {
    console.log("radioGroupChange", event.detail);
    this.selectedRadioGroup = event.detail;
    switch (this.operators) {
      case "addNumber": {
        if(isNaN(this.s)) {
          console.log("in if else")
          // this.s = 0
          this.s = this.navParams.get('pre_points')
          this.NoArr = []
          this.NoArr.push(this.s)

        }
        else{
          console.log("in else")
          this.NoArr = []
          this.NoArr.push(this.s)
        }
        console.log("case " + JSON.stringify(this.NoArr))
        this.selectedRadioGroup = 'addNumber'
        console.log("addNumber grpchng" + JSON.stringify(event.detail))
        break;
      }
      case "subNumber": {
        this.NoArr = []
        this.selectedRadioGroup = 'subNumber'
        console.log("subNumber grpchng" + JSON.stringify(event.detail))
        break;
      }

      // case "inputvalue": {
      //   if(isNaN(this.s)) {
      //     console.log("in if else")
      //     this.s = this.navParams.get('pre_points')
      //     this.NoArr = []
      //     this.NoArr.push(this.s)

      //   }
      //   else{
      //     console.log("in else")
      //     this.NoArr = []
      //     this.NoArr.push(this.s)
      //   }
      //   console.log("case " + JSON.stringify(this.NoArr))
      //   this.selectedRadioGroup = 'addNumber'
      //   console.log("addNumber grpchng" + JSON.stringify(event.detail))
      //   break;
      // }
      default: {
        console.log('ERROR: Invalid identifier: ' + event.target.value);
        break;
      }
    }
  }

  radioSelect1(event) {
    console.log("radioSelect", event);
  }
  radioSelect2(event) {
    console.log("radioSelect", event);
  }

  // radioSelect3(event) {
  //   console.log("radioSelect", event);
  // }

  getNumber(n) {
    console.log('you selected', n)
    this.a = n;
    this.NoArr.push(this.a);
 
    console.log('Store Array', this.NoArr)

    if (this.selectedRadioGroup == "addNumber") {

      this.s = 0
      console.log("======= +" + this.selectedRadioGroup)
      for (let i = 0; i < this.NoArr.length; i++) {
        this.s = this.s + this.NoArr[i]
        console.log("summmmm" + this.s)
      }
    }
    else if (this.selectedRadioGroup == "subNumber") {
      console.log("======= -" + this.selectedRadioGroup)
      console.log("before s value " + this.s)
      this.s = this.s - this.a;
      console.log("subbbb" + this.s)
    }

    //  else if (this.selectedRadioGroup == "inputvalue") {
    //   this.s = 0
    //   console.log("======= +" + this.selectedRadioGroup)
    //   for (let i = 0; i < this.NoArr.length; i++) {
    //     this.s = this.s + this.NoArr[i]
    //     console.log("summmmm" + this.s)
    //   }
    //   }
  }


  async submit() {
    console.log('input number', this.numberrrr);
    console.log('input s', this.s);
    console.log('input data', this.data);
    if( (100 > this.s) || (this.s % 100 != 0))
    {
      const alert = await this.alertCtrl.create({
        cssClass: 'alert-danger',
        header: 'Warning',
        mode:'ios',
        message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Enter value is Invalid</strong>`,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.emptydata = this.navParams.get('pre_points');
              this.modalController.dismiss(this.emptydata)
            }
          }],        
      });
      await alert.present();
    }
    else{
      this.modalController.dismiss(this.s)
      
    }
    
    //this.router.navigateByUrl(`home/${this.s}/${this.numberrrr}/${this.data}`);
    // this.router.navigateByUrl(`/tabs-menu/newgame/${this.s}/${this.numberrrr}/${this.data}`);
    // this.modalController.dismiss()
  }

  closeModal() {
    this.emptydata = this.navParams.get('pre_points');
    this.modalController.dismiss(this.emptydata)
  }

  close() {
    this.emptydata = this.s = this.navParams.get('pre_points');

    this.modalController.dismiss(this.emptydata)
  }

  send_0(){
    this.emptydata = 0;
    this.modalController.dismiss(this.emptydata)
  }

  

}
