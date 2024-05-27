import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    if (username === 'aramirez' && password === 'piecito') {
      this.isAuthenticated = true;
      this.router.navigate(['/memo']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }
}
