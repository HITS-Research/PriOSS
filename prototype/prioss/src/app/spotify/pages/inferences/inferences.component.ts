import { ChangeDetectionStrategy, Component, Input, ViewChild, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, shareReplay, startWith, switchMap } from 'rxjs';
import { InferencesMailComponent } from '../../features/inferences-mail/inferences-mail.component';
import { SpotifyInferenceState } from '../../features/inferences/inference.state';
import { Router } from '@angular/router';


/**
 * The ViewModel makes the inference data available to the html page.
 */
type ViewModel = {
  checked: boolean;

  dataCount: number;

  filteredInferencesData: Inference[];

  previewInferencesData: string[];

}

type Inference = { inference: string, checked: boolean };

/**
 * The Component processes the inferences, makes them searchable,
 * assigns a checkbox to each item, and enables the user to send
 * the inferences to Spotify support with a template to rectify selected inferences.
 */

@Component({
  selector: 'prioss-spotify-inferences',
  templateUrl: './inferences.component.html',
  styleUrls: ['./inferences.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InferencesComponent {

  #store = inject(Store)
  #router = inject(Router);

  @Input()
  previewMode: boolean;

  @ViewChild('InferencesMailComponent')
  inferencesMailComponent: InferencesMailComponent

  checkAll$ = new BehaviorSubject<boolean>(false);

  /**
   * The current inference data.
   */
  #inferenceData$: Observable<Inference[]> = this.#store.select(SpotifyInferenceState.inferences)
    .pipe(
      map(inferences => inferences.map(i => ({ inference: i, checked: false }))),
      switchMap(inferences => this.checkAll$
        .pipe(map(state => {
          inferences.forEach(i => i.checked = state);
          return inferences;
        }))
      ),
      shareReplay({ refCount: true })
    );

  /**
   * The subject with the current filter value.
   */
  filter$ = new BehaviorSubject<string>('');

  /**
   * The filtered inferences data, filtered by filter$.
   */
  #filteredInferencesData$: Observable<Inference[]> = this.#inferenceData$
    .pipe(
      filter(() => !this.previewMode),
      switchMap(inferences => this.filter$
        .pipe(
          map(f => f.toLowerCase()),
          map(
            f => f.length > 0
              ? inferences.filter(i => i.inference.toLowerCase().includes(f))
              : inferences
          )
        )
      ),
      startWith([])
    )


  /**
   *  Shows the first four inferences of the list in the preview page
   */
  #previewInferencesData$ = this.#inferenceData$
    .pipe(
      filter(() => this.previewMode),
      map(inferences => inferences.map(i => i.inference)),
      map(inferences => inferences.slice(0, 4)),
      startWith([])
    );
  /**
   * Checks if all inferences have been checked and sets the main checkbox accordingly
   */
  inferenceCheckClicked$ = new Subject<[Inference, boolean]>();
  #allChecked$ = this.#inferenceData$
    .pipe(
      switchMap(inferences => this.inferenceCheckClicked$
        .pipe(
          startWith(undefined),
          map(() => !inferences.some(i => !i.checked))
        )
      )
    )
  /**
   * The Observable that makes the inferences externally accessible.
   * It emits an update, when new data is pushed to one of the observable.
   */
  vm$: Observable<ViewModel> = combineLatest([
    this.#allChecked$,
    this.#inferenceData$,
    this.#filteredInferencesData$,
    this.#previewInferencesData$,
  ])
    .pipe(
      map(([a, i, f, l]) => ({
        checked: a,
        dataCount: i.length,
        filteredInferencesData: f,
        previewInferencesData: l,
      } as ViewModel))
    );

  /**
 * Navigates to the dashboard of the current feature.
 */
  navigateToDashboard() {
    this.#router.navigate(['dashboard']);
  }
}
