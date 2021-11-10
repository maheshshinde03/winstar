import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
const { Storage } = Plugins;

const TOKEN_KEY = 'my-token';

import * as moment from 'moment';

import { DatePipe } from '@angular/common';

import { Game } from '../interfaces/game';
import { User } from '../interfaces/user';
import { Bank } from '../interfaces/bank';
import { Notifications } from '../interfaces/notifications';




const baseUrl = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = 'http://localhost:3000/';
  //private dateToday: Date = new Date();
  private dateYesterday: Date = new Date();

  public user: Observable<any>;
  public bank: Observable<any>;
  public game: Observable<any>;

  private userData = new BehaviorSubject(null);
  serverUrl = environment.baseUrl;
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient,
              private transfer: FileTransfer,
              private datePipe: DatePipe) { 
    this.loadToken();
  }

  // uploadImage(img) {
 
  //   // Destination URL
  //   let url = this.apiURL + 'images';

  //   console.log(img);
  //   console.log(url);
 
  //   // File for Upload
  //   var targetPath = img;
 
  //   var options: FileUploadOptions = {
  //     fileKey: 'file',fileName: 'ionicfile',
  //     httpMethod:'post',
  //     chunkedMode: false,
  //     mimeType:"image/jpg",
  //     headers: {}
  //     // params: { 'desc': desc }
  //   };
 
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   fileTransfer.upload(targetPath, 'http://localhost:3000/images', options)
  //   .then((data) => {
  //   console.log(data+" Uploaded Successfully");

  // }, (err) => {
  //   console.log(err);
  
  // });
  //   // Use the FileTransfer to upload the image
  //   //return fileTransfer.upload(targetPath, url, options);
  // }


  public async uploadImage(img): Promise<any>  {
 
    var result = await this.http
			.post<any>(
				"http://localhost:3000/images",
				img, // Send the File Blob as the POST body.
				{
					// NOTE: Because we are posting a Blob (File is a specialized Blob
					// object) as the POST body, we have to include the Content-Type
					// header. If we don't, the server will try to parse the body as
					// plain text.
					headers: {
						"Content-Type": "multipart/form-data;"
					},
					params: {
						clientFilename: img.name,
						mimeType: "image/jpg"
					}
				}
			)
			.toPromise()
		;
    return({
			name: img.name,
			type: img.type,
			size: img.size,
			url: result.url
		});
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      //console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }


  login(credentials: {fran_userid, password}): Observable<any> 
  {
    return this.http.post(`${baseUrl}/userlogin`, credentials).pipe(
      map((data: any) => data[0].token),
      switchMap(token => {
        this.userData.next(token);
        let storageObs = from(Storage.set({key: TOKEN_KEY, value: token}));
        return storageObs;
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }
  
  register(credentials: {business_name,first_name,last_name,mobile,email,password})
  {
    return this.http.post(`${baseUrl}/registration`,credentials);
  }

  async getUser(): Promise<Observable<User>>
   {
    const token = await Storage.get({ key: TOKEN_KEY });
    if(token && token.value)
    {
      return this.http.get<User>(`${baseUrl}/getfranchises_info/${token.value}`);
    
    }        
  }

  
  async getbankdetails(): Promise<Observable<Bank>>
  {
    const token = await Storage.get({ key: TOKEN_KEY });
    if(token && token.value){  
      //console.log(token);
    return this.http.get<Bank>(`${baseUrl}/getbankdetails/${token.value}`);
    
  }
 }

 async update_user(credentials: {business_name,first_name,last_name,mobile,alt_mobile,email,business_category,business_address,city,pin_code,landmark})
 {
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
    return this.http.put(`${baseUrl}/update_franchise/${token.value}`,credentials);
  }
}

async update_bank(bankdetails: {account_name,account_no,bank_name,ifsc_code,branch_name,bank_city,account_type})
{
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
    return this.http.put(`${baseUrl}/update_franchise_bank/${token.value}`,bankdetails)
  }
}

async change_password(passworddetails: {change_pass})
{
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
  return this.http.put(`${baseUrl}/changepass/${token.value}`, passworddetails)
 }
}

// async calculate_game():Promise<Observable<Game>>{
//   const token = await Storage.get({ key: TOKEN_KEY });
//   if(token && token.value){
//   return this.http.get<Game>(`${baseUrl}/calculate_game/${token.value}`)
//    }
//  }

// async get_last_game_details():Promise<Observable<Game>>
//    {
//     const token = await Storage.get({ key: TOKEN_KEY });
//     if(token && token.value)
//     {
//       return this.http.get<Game>(`${baseUrl}/get_last_game_details/${token.value}`);
    
//     }        
//   }


//   async update_last_game_details(lastgamedetails)
//   {
//     const token = await Storage.get({ key: TOKEN_KEY });
//     if(token && token.value)
//     {
  
//     return this.http.put(`${baseUrl}/update_last_game_details/${token.value}`,lastgamedetails);
//     }
//   }

//   add_last_game_details(lastgamedetails){
//    console.log(lastgamedetails);
//    return this.http.post(`${baseUrl}/add_last_game_details`,lastgamedetails);
//  }

async submit_point_data(game_points: {img_1,img_2,img_3,img_4,img_5,img_6,img_7,img_8,img_9,img_10,img_11,img_0,f_id,gameid,date_time}){
  const token = await Storage.get({ key: TOKEN_KEY });
if(token && token.value){
  console.log(game_points);
  return this.http.post(`${baseUrl}/submit_game_details/${token.value}`, game_points)

}

}

async last_win_game_detaile():Promise<Observable<Game>>{
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
    //console.log(token)
  return this.http.get<Game>(`${baseUrl}/last_win_game_detaile/${token.value}`)
}
}

async get_notifications(): Promise<Observable<Notifications>>{
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
    //console.log(token)
  return this.http.get<Notifications>(`${baseUrl}/get_notifications/${token.value}`) 
}
}

view_notification(id)
{
  return this.http.get(`${baseUrl}/notification_detail/${id}`) 
}

update__notification_flag(id)
{
  return this.http.get(`${baseUrl}/update_notification_flag/${id}`)
}

async today_game_history(today): Promise<Observable<Game>>
{

  // let dte = (moment(new Date()).format("YYYY-MM-DD"))

  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
  return this.http.post<Game>(`${baseUrl}/today_game_history/${token.value}`,today) 
}
}

async yesterday_game_history(yesterday): Promise<Observable<Game>>
{

  // this.dateYesterday = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 1));
  // let date = moment( this.dateYesterday).format("YYYY-MM-DD");
  // console.log(yesterday);
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
  return this.http.post<Game>(`${baseUrl}/yesterday_game_history/${token.value}`,yesterday) 
 }
}

async date_history(dateRang: {start_date1, end_date1}){
 //console.log(dateRang);
  const token = await Storage.get({ key: TOKEN_KEY });
    return this.http.post(`${baseUrl}/date_history/${token.value}`,dateRang)
}

async UsersetImage(userData: {imageB64,user_id}){

  const token = await Storage.get({ key: TOKEN_KEY });
  console.log(`${baseUrl}/img/${token.value}`, userData)
  return this.http.post(`${baseUrl}/img/${token.value}`,userData) 

}



logout(): Promise<void> {
  this.userData.next(null);
  this.isAuthenticated.next(false);
  return Storage.remove({key: TOKEN_KEY});
}

}

