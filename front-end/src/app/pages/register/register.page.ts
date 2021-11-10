import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController,LoadingController } from '@ionic/angular';
import { Button } from 'protractor';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { UserService } from '../../services/user.service'

import { FirebaseService } from 'src/app/services/firebase.service';

import  { User } from '../../interfaces/user';
import { UsernameValidator } from 'src/app/validator/username-validator';
import { PhonenumValidator } from 'src/app/validator/phonenum_validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  credentials: FormGroup;
  showPassword = false;

  constructor(
    private fb:FormBuilder,
    private loadingController:LoadingController,
    private authService:AuthenticationService,
    private fire:FirebaseService,
    private alertCtrl:AlertController,
    private router:Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    let userValidator = new UsernameValidator(this.authService);
    this.credentials = this.fb.group({
      business_name:['',[Validators.required]],
      // user_name:['',[Validators.required],userValidator.checkUsername.bind(userValidator)],
      user_name:['',Validators.compose([Validators.required,Validators.maxLength(10)]),userValidator.checkUsername.bind(userValidator)],
      // user_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required]), userValidator.checkUsername.bind(userValidator)],
      
      first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
       last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      mobile:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      business_add:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(6)]],
     
    });
    // console.log(
    //   this.credentials = this.fb.group({
    //     business_name:['',[Validators.required]],
    //     user_name:['',[Validators.required],userValidator.checkUsername.bind(userValidator)],
    //     // user_name:['',Validators.compose([Validators.required,Validators.maxLength(10)]),userValidator.checkUsername.bind(userValidator)],
    //     // user_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z]*'), Validators.required]), userValidator.checkUsername.bind(userValidator)],
    //      first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    //      last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    //     mobile:['',[Validators.required]],
    //     email:['',[Validators.required,Validators.email]],
    //     password:['',[Validators.required,Validators.minLength(6)]],
       
    //   })

    // );

    //  console.log(userValidator.checkUsername.bind(userValidator));

  }

  togglePasswordText() {
    //console.log('togglePasswordText: ', this.showPassword);
    this.showPassword = !this.showPassword;
}

  async signUp() {
    this.fire.signUp(this.credentials.value);
  }



  async register(){
    
    const loading = await this.loadingController.create();
    await loading.present();
    this.signUp();
    this.authService.register(this.credentials.value).subscribe(
      async (res) =>{
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header:'Success',
            mode:'ios',
            message: `<img src="../../../assets/img/success.png" class="alert-success"><br><br><strong>  Submit Successful</strong>`,
          buttons:['ok'],
        });
        await alert.present();
        this.router.navigateByUrl('/');
      }
    )
  }


  transform(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }

  get business_name(){

    let b_name =  this.credentials.get('business_name').toString()

    return this.transform(b_name)

  }

  get user_name(){
    return this.credentials.get('user_name');
  }

  get first_name(){
    return this.credentials.get('first_name');
  }

  get last_name(){
    return this.credentials.get('last_name');
  }

  get mobile(){
    return this.credentials.get('mobile');
  }

  get email(){
    return this.credentials.get('email');
  }

  get business_add(){
    return this.credentials.get('business_add');
  }

  get password(){
    return this.credentials.get('password');
  }

  

}
