import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkProviderService {

  constructor( private alertCtrl:AlertController) { }


  async createAlert(header, backdropDismiss, message, buttonOptions1, buttonOptions2?): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
    header,
    backdropDismiss,
    message,
    buttons: !buttonOptions2 ? [buttonOptions1] : [buttonOptions1,           buttonOptions2]
    });
    return alert;
    }
}
