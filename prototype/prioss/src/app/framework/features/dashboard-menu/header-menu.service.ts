import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NzMenuModeType } from 'ng-zorro-antd/menu';
import { map, startWith, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderMenuService {
  menuOpen = signal<boolean>(false);

  triggerMenu() {
    this.menuOpen.update(state => !state);
  }

  menuMode = toSignal<NzMenuModeType>(
    inject(BreakpointObserver)
      .observe(['(min-width: 950px)'])
      .pipe(
        map(state => (state.matches ? 'horizontal' : 'inline')),
        startWith(window.innerWidth >= 950 ? 'horizontal' : 'inline'),
        filter(
          (mode): mode is NzMenuModeType =>
            mode === 'horizontal' || mode === 'inline',
        ),
      ),
    { requireSync: true },
  );

  isModal = computed(() => {
    const isSetAsOpen = this.menuOpen();
    const menuMode = this.menuMode();

    return menuMode === 'inline' && isSetAsOpen;
  });
}
