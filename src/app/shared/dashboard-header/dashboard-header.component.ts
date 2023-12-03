import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Request } from '../models/Request/request';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {

  requestModel = new Request();
  superAdminPerm = false;
  clientPerm = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  onClickSignOut() {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("emailAddress");

    this.router.navigate(['auth']);
  }
}
