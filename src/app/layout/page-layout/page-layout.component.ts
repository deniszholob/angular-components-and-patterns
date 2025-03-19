import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Link, Notification, routeStringToLink } from 'src/app/components';
import { AuthGuard } from 'src/app/core';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, FooterComponent, HeaderComponent],
})
export class PageLayoutComponent {
  protected readonly banner?: Notification; // = new Banner();
  protected navLinks: Link[] = [];

  constructor(
    protected authGuard: AuthGuard,
    private router: Router,
  ) {
    this.setAvailableLinks();
  }

  protected setAvailableLinks(): void {
    this.navLinks = [];

    for (const route of this.router.config) {
      if (route.path?.includes('**')) continue;

      if (!route.canActivate) {
        this.navLinks.push(routeStringToLink(route.path ?? ''));
        continue;
      }

      if (this.authGuard.canActivate()) {
        this.navLinks.push(routeStringToLink(route.path ?? ''));
      }

      // Handle multiple guards
      // const canActivateGuards = route.canActivate?.map((guard: any) =>
      //   inject(guard as ProviderToken<any>).canActivate(),
      // );

      // if (canActivateGuards) {
      //   const results = await Promise.all(canActivateGuards);
      //   if (results.every((res) => res === true)) {
      //     this.links.push(routeStringToLink(route.path ?? ''));
      //   }
      // }
    }
  }
}
