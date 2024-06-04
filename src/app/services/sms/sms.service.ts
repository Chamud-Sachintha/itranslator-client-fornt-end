import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SMSModel } from 'src/app/shared/models/SMSModel/smsmodel';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor(private http: HttpClient) { }

  sendRegisterVerifySmsCode(smsModel: SMSModel) {
    const path = environment.appURL + "send-sms";
    return this.http.post(path, smsModel);
  }

  verifyRegisterCodeSms(smsModel: SMSModel) {
    const path = environment.appURL + "verify-register-code";
    return this.http.post(path, smsModel);
  }
}
