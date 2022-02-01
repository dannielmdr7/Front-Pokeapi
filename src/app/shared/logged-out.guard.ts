import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(private router: Router) { }

    canActivate() {
        // If the user is not logged in we'll send them back to the home page
        if (localStorage.getItem('navigationToken')) {
            this.router.navigate(['/loged/home']);
            return false;
        }

        return true;
    }
}
