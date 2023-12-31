import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private readonly router: Router) {}

  isActiveRoute(route: string): boolean {
    return this.router.url === '/admin/' + route;
  }

  onLogoutClick(): void {
    sessionStorage.removeItem("token")
  }
}
