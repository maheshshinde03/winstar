import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-withdraw-points',
  templateUrl: './withdraw-points.page.html',
  styleUrls: ['./withdraw-points.page.scss'],
})
export class WithdrawPointsPage implements OnInit {

   todo: FormGroup
  constructor(
              private formBuilder: FormBuilder,
              private alertController: AlertController )
             {
              this.todo = this.formBuilder.group({
                points: ['', 
                Validators.required],
          
              });

              }
    
    
  ngOnInit() {
  }

  withdrawForm(){
    console.log(this.todo.value)
  }




 
}
