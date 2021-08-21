import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

@Injectable({
    providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
            return new Promise(
                (resolve, reject) => {
                    firebase.auth().onAuthStateChanged(
                        (user) => {
                            if (user) {
                                resolve(true);
                                console.log(user);
                            } else {
                                this.router.navigate(['signin']);
                                resolve(false);
                            }
                        }
                    );
                }
            );
    }
    
}
