import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private userService: UserService,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.credentials = this.fb.group({
      fran_userid: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();        
        this.router.navigateByUrl('/tabs-menu', { replaceUrl: true });
      },
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          mode:'ios',
          message: `<img src="../../../assets/img/warning.png" class="alert-warning"><br><br><strong>Invalid User</strong>`,
          // message: res.error.error,
          buttons: ['OK'],
        });
 
        await alert.present();
      }
    );
  }
 
  // Easy access for form fields
  get fran_userid() {
    return this.credentials.get('fran_userid');
  }
  
  get password() {
    return this.credentials.get('password');
  }

}
