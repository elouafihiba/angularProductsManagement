import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppStateService } from "../services/app-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard {
  constructor(
    private appState: AppStateService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated
    if (this.appState.authState.isAuthenticated) {
      return true;  // Allow access to the route
    } else {
      // User is not authenticated, redirect to login
      console.log('User is not authenticated, redirecting to login');
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
