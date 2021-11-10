import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
// import 'rxjs/add/operator/toPromise';
@Injectable()
export class PhonenumValidator {

    
    isValidNumber(control: FormControl){
    return 
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
