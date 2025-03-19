import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Link, LinkComponent } from 'src/app/components';
import { TooltipDirective, TooltipPosition } from 'src/app/utils';

import { APP_INFO } from './app-info/app-info.data';
import { AppInfo } from './app-info/app-info.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, LinkComponent, TooltipDirective],
})
export class FooterComponent {
  protected readonly TooltipPosition = TooltipPosition;
  public readonly APP_INFO: AppInfo = APP_INFO;
  public readonly LINKS_CONNECT: Link[] = [APP_INFO.discord, APP_INFO.github];
  public readonly LINKS_DONATE: Link[] = [APP_INFO.kofi, APP_INFO.patreon];

  constructor(
    /** @usage { provide: 'APP_BUILD_DATE', useValue: APP_BUILD_DATE }, */
    @Inject('APP_BUILD_VERSION')
    protected version: string,
    /** @usage { provide: 'APP_BUILD_DATE', useValue: APP_BUILD_DATE }, */
    @Inject('APP_BUILD_DATE')
    protected date: number,
  ) {}
}
