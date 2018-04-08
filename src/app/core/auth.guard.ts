import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';

import { AuthService } from './auth.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


      return this.auth.user
          .take(1)
          .map(user => !!user)
          .do(loggedIn => {
              if (!loggedIn) {
                  console.log('access denied')
                  this.router.navigate(['/login']);
              }
              else
                  {
                  this.auth.user.forEach(user => {
 //                     console.log(user.displayName);
 /*                      
                      if (user.email !== "amit.trehan44@gmail.com") {
                          
                          console.log('access denied')
                          this.router.navigate(['/login']);
                          alert("user is not authorised to login, please contact Admin");
                      }
*/
                      if (['amit.trehan44@gmail.com', 'cdhingra99@gmail.com', 'varun6369@gmail.com', 'gsaddher@gmail.com'].indexOf(user.email) < 0) {
                          console.log('access denied')
                          this.router.navigate(['/login']);
                          alert("user is not authorised to login, please contact Admin");
                      }

                      });
              }
          })
  }
}
