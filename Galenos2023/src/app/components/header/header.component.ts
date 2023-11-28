import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router, public authService: AuthService) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout():void {
    this.authService.logout();
  }

}
