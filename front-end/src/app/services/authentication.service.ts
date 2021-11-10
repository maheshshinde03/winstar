import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';

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




 //const baseUrl = 'http://localhost:3000';

 const baseUrl = 'https://nodeapi.win-star.online';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  private dateYesterday: Date = new Date();

  public user: Observable<any>;
  public bank: Observable<any>;
  public game: Observable<any>;

  private userData = new BehaviorSubject(null);
  serverUrl = environment.baseUrl;
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient) { 
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
 
  login(credentials: {fran_userid, password}): Observable<any> 
  {
    return this.http.post(`${baseUrl}/userlogin`, credentials).pipe(
      map((data: any) => data[0].fran_id),
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

  validateUsername(username){
    console.log(username);
    return this.http.get(`${baseUrl}/validate_username/` + username).pipe(map(res => res[0]));
  }

  register(credentials: {business_name,user_name,first_name,last_name,mobile,email,password})
  {
    console.log(credentials);
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

 async get_compony_m_status()
{
  return this.http.get<any>(`${baseUrl}/company_master`);
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


async submit_point_data(game_points: {img_1,img_2,img_3,img_4,img_5,img_6,img_7,img_8,img_9,img_10,img_11,fran_id,game_id,date_time}){
  const token = await Storage.get({ key: TOKEN_KEY });
if(token && token.value){
  console.log(game_points);
  return this.http.post(`${baseUrl}/submit_game_details/${token.value}`, game_points)

}

}

async last_win_game_details():Promise<Observable<Game>>{
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
    //console.log(token)
  return this.http.get<Game>(`${baseUrl}/last_win_game_details`)
}
}

async current_game_id(){
  return this.http.get(`${baseUrl}/current_game_id`);
}

async get_current_gameImg_amount():Promise<Observable<Game>>{
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
  return this.http.get<Game>(`${baseUrl}/get_current_gameImg_amount/${token.value}`);
  }
}


async fran_last_win_game_details():Promise<Observable<Game>>{
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
    //console.log(token)
  return this.http.get<Game>(`${baseUrl}/fran_last_win_game_details/${token.value}`)
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

async get_current_game_time()
{
  return this.http.get(`${baseUrl}/get_current_game_time`);
}

async today_game_history(today): Promise<Observable<Game>>
{
  console.log(today);
  const token = await Storage.get({ key: TOKEN_KEY });
  if(token && token.value){
  return this.http.post<Game>(`${baseUrl}/today_game_history/${token.value}`,today) 
 }
}

async yesterday_game_history(yesterday): Promise<Observable<Game>>
{
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


getuserImage(){

  return new Promise(async (resolve, reject) =>{
    let headers = new HttpHeaders();
    const token = await Storage.get({ key: TOKEN_KEY });
    console.log(`${this.serverUrl}api/getuser_img/`+ token.value,  {headers: headers})
    this.http.get(`${this.serverUrl}api/getuser_img/`+ token.value, {headers: headers}).
    subscribe(res =>{
      console.log(res);
      resolve(JSON.stringify(res));
    }, (err) =>{
    reject(err);
  });
  
  });
  }


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


 
  logout(): Promise<void> {
    this.userData.next(null);
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}
