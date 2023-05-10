import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenStorage.getUser();
    if (currentUser) {
      // L'utilisateur est connecté, donc renvoyer vrai pour permettre l'accès à la page
      return true;
    }

    // L'utilisateur n'est pas connecté, donc rediriger vers la page de connexion
    this.router.navigate(['/authenticate'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
