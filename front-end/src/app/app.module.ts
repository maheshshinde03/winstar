import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { IonicStorageModule} from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { Calendar } from '@ionic-native/calendar';
import { Calendar } from '@ionic-native/calendar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { Network } from '@ionic-native/network/ngx';
import {CommonModule, DatePipe} from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { UsernameValidator } from './validator/username-validator';
import { SplashScreen} from '@ionic-native/splash-screen/ngx'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'
// import { BackgroundMode } from '@ionic-native/background-mode/ngx'
// import { Autostart } from '@ionic-native/autostart/ngx'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    CommonModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    HttpClientModule],
  providers: [
    LocalNotifications,
    // Autostart,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: AuthGuard, useClass: AuthGuard },
    // BackgroundMode,
    SplashScreen,
    UsernameValidator,
    Calendar,
    DatePipe,
    Camera,
    File,
    WebView,
    FilePath,
    FileTransfer,Network],
  bootstrap: [AppComponent],
})
export class AppModule {}
