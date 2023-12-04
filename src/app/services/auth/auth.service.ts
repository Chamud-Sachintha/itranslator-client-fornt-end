import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'src/app/shared/models/Auth/auth';
import { Client } from 'src/app/shared/models/Client/client';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authenticateUser(authModel: Auth) {
    const path = environment.appURL + "signin";
    return this.http.post(path, authModel);
  }

  registerUser(client: Client) {
    const path = environment.appURL + "signup";
    return this.http.post(path, client);
  }
}
