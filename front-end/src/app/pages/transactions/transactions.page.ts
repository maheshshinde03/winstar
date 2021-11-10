import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
  
    setTimeout(() => {
      // this.ionViewWillEnter();
      // console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
