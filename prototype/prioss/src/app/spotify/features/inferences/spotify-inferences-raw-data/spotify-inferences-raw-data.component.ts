import { AsyncPipe, NgFor } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, ViewChild } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { InferencesMailComponent } from '../../inferences-mail/inferences-mail.component';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, map, switchMap, shareReplay, filter, startWith, Subject, combineLatest } from 'rxjs';
import { SpotifyInferenceState } from '../inference.state';

/**
 * The ViewModel makes the inference data available to the html page.
 */
type ViewModel = {
  checked: boolean;

  dataCount: number;

  filteredInferencesData: Inference[];

  previewInferencesData: string[];
};

type Inference = { inference: string; checked: boolean };

@Component({
  selector: 'prioss-spotify-inferences-raw-data',
  templateUrl: './spotify-inferences-raw-data.component.html',
  styleUrl: './spotify-inferences-raw-data.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    InferencesMailComponent,
    NgFor,
    NzButtonModule,
    NzCardModule,
    NzCheckboxModule,
    NzEmptyModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzToolTipModule,
  ],
})
export class SpotifyInferencesRawDataComponent {
  #store = inject(Store);

  @Input({ transform: booleanAttribute })
  previewMode: boolean;

  @ViewChild('InferencesMailComponent')
  inferencesMailComponent: InferencesMailComponent;

  checkAll$ = new BehaviorSubject<boolean>(false);

  /**
   * The current inference data.
   */
  #inferenceData$: Observable<Inference[]> = this.#store
    .select(SpotifyInferenceState.inferences)
    .pipe(
      map(inferences =>
        inferences.map(i => ({ inference: i, checked: false })),
      ),
      switchMap(inferences =>
        this.checkAll$.pipe(
          map(state => {
            inferences.forEach(i => (i.checked = state));
            return inferences;
          }),
        ),
      ),
      shareReplay({ refCount: true }),
    );

  /**
   * The subject with the current filter value.
   */
  filter$ = new BehaviorSubject<string>('');

  /**
   * The filtered inferences data, filtered by filter$.
   */
  #filteredInferencesData$: Observable<Inference[]> = this.#inferenceData$.pipe(
    filter(() => !this.previewMode),
    switchMap(inferences =>
      this.filter$.pipe(
        map(f => f.toLowerCase()),
        map(f =>
          f.length > 0
            ? inferences.filter(i => i.inference.toLowerCase().includes(f))
            : inferences,
        ),
      ),
    ),
    startWith([]),
  );

  /**
   *  Shows the first four inferences of the list in the preview page
   */
  #previewInferencesData$ = this.#inferenceData$.pipe(
    filter(() => this.previewMode),
    map(inferences => inferences.map(i => i.inference)),
    map(inferences => inferences.slice(0, 4)),
    startWith([]),
  );
  /**
   * Checks if all inferences have been checked and sets the main checkbox accordingly
   */
  inferenceCheckClicked$ = new Subject<[Inference, boolean]>();
  #allChecked$ = this.#inferenceData$.pipe(
    switchMap(inferences =>
      this.inferenceCheckClicked$.pipe(
        startWith(undefined),
        map(() => !inferences.some(i => !i.checked)),
      ),
    ),
  );
  /**
   * The Observable that makes the inferences externally accessible.
   * It emits an update, when new data is pushed to one of the observable.
   */
  vm$: Observable<ViewModel> = combineLatest([
    this.#allChecked$,
    this.#inferenceData$,
    this.#filteredInferencesData$,
    this.#previewInferencesData$,
  ]).pipe(
    map(
      ([a, i, f, l]) =>
        ({
          checked: a,
          dataCount: i.length,
          filteredInferencesData: f,
          previewInferencesData: l,
        }) as ViewModel,
    ),
  );
}
