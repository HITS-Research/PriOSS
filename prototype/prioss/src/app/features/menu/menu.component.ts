import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from './menu.type';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

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
  selector: 'prioss-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NzIconModule,
    NzMenuModule,
    RouterModule
  ],
})
export class MenuComponent {

  /**
   * All the menu-items which will be displayed.
   */
  #menu$$ = new BehaviorSubject<MenuItem[]>([]);

  /**
   * All the menu-items which will be displayed.
   */
  @Input({ required: true })
  set menu(items: MenuItem[]) {
    this.#menu$$.next(items);
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
   * Everything, which will be send to the View of this component.
   */
  vm$: Observable<ViewModel> = combineLatest([
    this.#menu$$,
    this.#collapsed$$
  ])
    .pipe(
      map(([m, c]) => ({
        menu: m,
        collapsed: c
      } as ViewModel))
    );

}
