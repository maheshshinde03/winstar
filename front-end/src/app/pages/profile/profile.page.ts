 import { Component, EventEmitter, Input, OnInit, Output ,ChangeDetectorRef} from '@angular/core';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 import { Router } from '@angular/router';
 import { ActionSheetController, ToastController, Platform, LoadingController, ModalController ,AlertController} from '@ionic/angular';
 import { Button } from 'protractor';
 import { from } from 'rxjs';
 import { AuthenticationService } from 'src/app/services/authentication.service';
 import { UserService } from '../../services/user.service'


 import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

import { finalize } from 'rxjs/operators';
const STORAGE_KEY = 'my_images';

 import  { User } from '../../interfaces/user';
 import { Bank } from '../../interfaces/bank';
 import { Camera, CameraOptions ,PictureSourceType} from "@ionic-native/camera/ngx";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  images = [];
  platform: any;

  segmentModel = "profile";
   users: User;
   banks: Bank;
   credentials: FormGroup;
   bankdetails: FormGroup;
   passworddetails: FormGroup;
  
   loop:any=[];
   userImg: any = '';
   user_id:any;
  public response: any;
  public base64Image: string;
  public fileImage: string;
  public responseData: any;
   userData = {imageB64: "",user_id:"" };

   constructor(
     private fb: FormBuilder,
     private camera: Camera,
     private file: File,
     private http: HttpClient, 
     private webview: WebView,
     private actionSheetController: ActionSheetController, 
     private toastController: ToastController,
     private storage: Storage, private plt: Platform, 
     private loadingController: LoadingController,
     private ref: ChangeDetectorRef, 
     private filePath: FilePath,
     private router: Router, 
     private authService:AuthenticationService,
     private alertCtrl:AlertController,
     public modalController: ModalController,
     private userService: UserService,
     private network: Network,
     ) { 
      this.userImg = '../assets/img/dog.jpg';
      // this.getImage();
     }  

    

      async ngOnInit() {
        
       this.credentials = this.fb.group({         
         business_name:['',[Validators.required]],
         first_name:['',[Validators.required]],
         last_name:['',[Validators.required]],
         mobile:['',[Validators.required]],
         alt_mobile:[''],
         email:['',[Validators.required,Validators.email]],
         business_category:['',[Validators.required]],
         business_address:['',[Validators.required]],
         city:['',[Validators.required]],
         pin_code:['',[Validators.required]],
         landmark:['',[Validators.required]],
        // password:['',[Validators.required]],
       
       });

       this.bankdetails = this.fb.group({         
        account_name:['',[Validators.required]],
        account_no:['',[Validators.required]],
        bank_name:['',[Validators.required]],
        ifsc_code:['',[Validators.required]],
        branch_name:['',[Validators.required]],
        bank_city:['',[Validators.required]],
        account_type:['',[Validators.required]]
      
      });

      this.passworddetails = this.fb.group({         
        change_pass:['',[Validators.required]]      
      });

       (await this.authService.getUser()).subscribe(response =>{
        this.users = response
        console.log(response);
       }),
    
      (await this.authService.getbankdetails()).subscribe(data =>{
      this.banks = data
      //console.log(data);
      })
  
    }

    ionViewWillEnter(){
      this.plt.ready().then(async () => {

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
      });
    }


    get business_name(){
      return this.credentials.get('business_name');
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
  
    get landmark(){
      return this.credentials.get('landmark');
    }
  
  
    get business_category(){
      return this.credentials.get('business_category');
    }

    get business_address(){
      return this.credentials.get('business_address');
    }

    get city(){
       return this.credentials.get('city');
     }

    get pin_code(){
      return this.credentials.get('pin_code');
    }

    get email(){
      return this.credentials.get('email');
    }

    get account_name(){
      return this.bankdetails.get('account_name');
    } 

    get account_no(){
      return this.bankdetails.get('account_no');
    } 

    get bank_name(){
      return this.bankdetails.get('bank_name');
    } 

    get ifsc_code(){
      return this.bankdetails.get('ifsc_code');
    } 

    get branch_name(){
      return this.bankdetails.get('branch_name');
    } 

    get bank_city(){
      return this.bankdetails.get('bank_city');
    } 

    get account_type(){
      return this.bankdetails.get('account_type');
    } 

    get change_pass(){
      return this.passworddetails.get('change_pass');
    }

  async profileUpdate(){
    const loading = await this.loadingController.create();
    await loading.present();

    (await this.authService.update_user(this.credentials.value)).subscribe(
      async (res) =>{
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header:'Success',
          message: 'Information updated Successfully',
          // message: res.error.error,
          buttons:['ok'],
        });
        await alert.present();
        this.router.navigateByUrl('/tabs-menu/profile');
      }
    )
  }

  async changePass(){
    const loading = await this.loadingController.create();
    await loading.present();

    (await this.authService.change_password(this.passworddetails.value)).subscribe(
      async (res) =>{
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header:'Success',
          message: 'Password change Successfully',
          // message: res.error.error,
          buttons:['ok'],
        });
        await alert.present();
        this.router.navigateByUrl('/tabs-menu/profile');
      }
    )
  }

  async bankUpdate(){
    const loading = await this.loadingController.create();
    await loading.present();

    (await this.authService.update_bank(this.bankdetails.value)).subscribe(
      async (res) =>{
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header:'Success',
          message: 'Information updated Successfully',
          // message: res.error.error,
          buttons:['ok'],
        });
        await alert.present();
        this.router.navigateByUrl('/tabs-menu/profile');
      }
    )
  }





}


