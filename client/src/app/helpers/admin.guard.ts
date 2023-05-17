import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private storageService: StorageService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // const expectedRole = "ROLE_ADMIN"
    const expectedRole = route.data["expectedRole"];
    const userRole = this.storageService.getUser().roles[0]// Assuming the user role is stored in local storage

    if (userRole !== expectedRole) {
      // User does not have the required role, deny access
      alert("You don't have permission to view this page")
      return false;
    }
    return true;
  }
}
