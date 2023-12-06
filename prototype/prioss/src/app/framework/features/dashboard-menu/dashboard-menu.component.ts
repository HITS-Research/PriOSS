import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { MenuComponent } from 'src/app/features/menu/menu.component';
import { MenuItem } from 'src/app/features/menu/menu.type';

/**
 * The view-model scheme of this component.
 */
type ViewModel = {

  /**
   * All the menu-items which will be displayed.
   */
  menu: MenuItem[];

  /**
   * The collapse-state of the menu.
   */
  collapsed: boolean;

};

@Component({
  selector: 'prioss-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './dashboard-menu.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    MenuComponent
  ],
})
export class DashboardMenuComponent {

  /**
   * All default menu-items.
   *
   * @remarks There is no general place to store them. So they lay here.
   */
  menuItems: MenuItem[] = [
    {
      icon: 'home',
      name: 'Home',
      link: '/home'
    }, {
      icon: 'info-circle',
      name: 'About',
      link: '/about'
    }, {
      icon: 'form',
      name: 'Contact',
      link: '/contact'
    }, {
      icon: 'warning',
      name: 'Known Issues',
      link: '/known-issues'
    }
  ]

  /**
   * All the service-menu-items.
   *
   * @param serviceName The name of the current selected service.
   * @returns All service-menu-items with a link to the selected service.
   * @remarks There is no general place to store them. So they lay here.
   */
  getSubMenuItems(serviceName: string): MenuItem {
    return {
      icon: 'dashboard',
      name: 'Dashboard',
      children: [
        {
          name: 'Introduction',
          link: `${serviceName}/dashboard`,
          fragment: 'introduction'
        }, {
          name: 'Visualization',
          link: `${serviceName}/dashboard`,
          fragment: 'visualization'
        }, {
          name: 'Rectification',
          link: `${serviceName}/dashboard`,
          fragment: 'rectification'
        }, {
          name: 'Recommendation',
          link: `${serviceName}/dashboard`,
          fragment: 'recommendation'
        }, {
          name: 'GDPR/Rights',
          link: `${serviceName}/dashboard`,
          fragment: 'gdpr'
        }, {
          name: 'Purpose',
          link: `${serviceName}/dashboard`,
          fragment: 'purpose'
        }, {
          name: 'Frequently asked questions',
          link: `${serviceName}/dashboard`,
          fragment: 'faq'
        }
      ]
    };
  }

  /**
   * The position of the "Dashboard"-sub-menu.
   */
  get DASHBOARD_POSITION(): number {
    return 1;
  }

  /**
   * The Name of the current by the user selected service.
   */
  #serviceName$$ = new BehaviorSubject<string>('');

  /**
   * The Name of the current by the user selected service.
   */
  @Input()
  set serviceName(name: string | null | undefined) {
    this.#serviceName$$.next(name ?? '');
  }

  /**
   * The collapse-state of the menu.
   */
  #collapsed$$ = new BehaviorSubject<boolean>(false);

  /**
   * The collapse-state of the menu.
   */
  @Input()
  set collapsed(collapsed: boolean) {
    this.#collapsed$$.next(collapsed);
  }

  /**
   * All the menu-items which will be displayed.
   */
  #menu$ = this.#serviceName$$
    .pipe(
      map(name => {
        if (name) {
          const newMenuItems = [...this.menuItems];
          newMenuItems.splice(this.DASHBOARD_POSITION, 0, this.getSubMenuItems(name));
          return newMenuItems;
        } else {
          return this.menuItems;
        }
      })
    )

  /**
   * Everything, which will be send to the View of this component.
   */
  vm$: Observable<ViewModel> = combineLatest([
    this.#menu$,
    this.#collapsed$$
  ])
    .pipe(
      map(([m, c]) => ({
        menu: m,
        collapsed: c
      } as ViewModel))
    );

}
