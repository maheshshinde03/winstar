import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
// import 'rxjs/add/operator/toPromise';
@Injectable()
export class UsernameValidator {

    
   
    static userService: AuthenticationService;
    constructor(userService: AuthenticationService){
        UsernameValidator.userService = userService;
    }
    checkUsername(control: FormControl){
    return new Promise ( resolve => {
        UsernameValidator.userService.validateUsername(control.value).subscribe(count => {
            console.log(count == null);
            // console.log(count < 0);

                if(count == null){  
                    console.log("This is Null");   
                    return resolve(null);             
                    
                }else {
                    console.log("This is is_notavail = true");   

                    return resolve({is_notavail: true});
                }
    })
    })
}
    

//   debouncer: any;

//   constructor(public auth: AuthenticationService){

//   }

//   checkUsername(control: FormControl): any {

//     clearTimeout(this.debouncer);

//     return new Promise(resolve => {

//       this.debouncer = setTimeout(() => {

//         this.auth.validateUsername(control.value).subscribe((res) => {            
//           if(res > 0){
//               console.log(res);
//           resolve({'usernameInUse': true});

//           }
//         }, (err) => {
//             console.log('send Null');
//             resolve(null);

//         });

//       }, 1000);      

//     });
//   }
}
