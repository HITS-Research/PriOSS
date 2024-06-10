import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderMenuService } from './header-menu.service';
import { MenuItem } from './menu.type';

@Component({
  selector: 'prioss-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrl: './dashboard-menu.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzIconModule, NzMenuModule, RouterModule],
})
export class DashboardMenuComponent {
  headerMenuService = inject(HeaderMenuService);

  /**
   * The Name of the current by the user selected service.
   */
  serviceName = input<string | null | undefined>(null);

  /**
   * All the menu-items which will be displayed.
   */
  menu = computed(() => {
    const name = this.serviceName();
    if (name) {
      const menuItemsWithService = [...MENU_ITEMS];
      menuItemsWithService.splice(DASHBOARD_POSITION, 0, getSubMenuItems(name));
      return menuItemsWithService;
    } else {
      return MENU_ITEMS;
    }
  });
}

/**
 * The position of the "Dashboard"-sub-menu.
 */
const DASHBOARD_POSITION = 1;

/**
 * All default menu-items.
 *
 * @remarks There is no general place to store them. So they lay here.
 */
const MENU_ITEMS: MenuItem[] = [
  {
    icon: 'home',
    name: 'Home',
    link: '/home',
  },
  {
    icon: 'eye',
    name: 'Dark Patterns',
    link: '/dark-patterns',
  },
  {
    icon: 'global',
    name: 'GDPR',
    link: '/gdpr',
  },
  {
    icon: 'question-circle',
    name: 'Help',
    children: [
      {
        name: 'FAQ',
        link: '/faq',
      },
      {
        name: 'Known Issues',
        link: '/known-issues',
      },
      {
        name: 'Contact',
        link: '/contact',
      },
      {
        name: 'About',
        link: '/about',
      },
    ],
  },
];

/**
 * All the service-menu-items.
 *
 * @param serviceName The name of the current selected service.
 * @returns All service-menu-items with a link to the selected service.
 * @remarks There is no general place to store them. So they lay here.
 */
function getSubMenuItems(serviceName: string): MenuItem {
  return {
    icon: 'dashboard',
    name: 'Dashboard',
    children: [
      {
        name: 'Introduction',
        link: `${serviceName}/dashboard`,
        fragment: 'introduction',
      },
      {
        name: 'Visualization',
        link: `${serviceName}/dashboard`,
        fragment: 'visualization',
      },
      {
        name: 'Rectification',
        link: `${serviceName}/dashboard`,
        fragment: 'rectification',
      },
      {
        name: 'Recommendation',
        link: `${serviceName}/dashboard`,
        fragment: 'recommendation',
      },
      {
        name: 'Purpose',
        link: `${serviceName}/dashboard`,
        fragment: 'purpose',
      },
    ],
  };
}
