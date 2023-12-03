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

  getMenuPermissions(requestModel: any) {
    const path = environment.appURL + "get-menu-perm";
    return this.http.post(path, requestModel);
  }

  authenticateUser(authModel: Auth) {
    const path = environment.appURL + "authenticate-user";
    return this.http.post(path, authModel);
  }

  createNewClient(clientModel: Client) {
    const path = environment.appURL + "add-client";
    return this.http.post(path, clientModel);
  }
}
