import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  numberAttribute,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzStepsComponent, NzStepsModule } from 'ng-zorro-antd/steps';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  merge,
  scan,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Step } from './step.type';

/**
 * The data, which will be displayed in the frontend.
 */
type ViewModel = {
  /**
   * All the steps, which are available.
   */
  steps: Step[];

  /**
   * The current selected step.
   */
  currentStep: Step;

  /**
   * The current selected index.
   */
  stepIndex: number;

  /**
   * Represents the loading-state of one image in this component.
   */
  isLoading: boolean;
};

/**
 * The default stepper component for displaying a instruction with text and
 * image.
 * @author Alexander Nickel (nickela(at)mail.uni-paderborn.de)
 */
@Component({
  selector: 'prioss-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    NzStepsModule,
    NzButtonModule,
    NzSkeletonModule,
  ],
})
export class StepperComponent {
  /**
   * Reference to the HTML-element of the steps-component.
   */
  @ViewChild(NzStepsComponent, { read: ElementRef })
  stepsComponent: ElementRef;

  /**
   * All the steps, which are available.
   */
  #steps$$ = new BehaviorSubject<Step[]>([]);

  /**
   * All the steps, which are available.
   */
  @Input({ required: true })
  set steps(steps: Step[]) {
    this.#steps$$.next(steps);
  }

  /**
   * The current initial selected step by the user.
   */
  #stepIndex$$ = new BehaviorSubject<number>(0);

  /**
   * The current initial selected step by the user.
   */
  get stepIndex$$(): BehaviorSubject<number> {
    return this.#stepIndex$$;
  }

  /**
   * Sets the current initial selected step.
   */
  @Input({ transform: numberAttribute })
  set stepIndex(index: number) {
    this.stepIndex$$.next(index);
  }

  /**
   * Changes the selected index.
   */
  #next$$ = new Subject<number>();

  /**
   * Changes the selected index.
   */
  get next$$(): Subject<number> {
    return this.#next$$;
  }

  /**
   * The current selected step.
   */
  #stepIndex$: Observable<number> = combineLatest([
    merge(
      this.#next$$.pipe(
        startWith(0),
        map(value => (acc: number) => acc + value),
      ),
      this.stepIndex$$.pipe(map(value => () => value)),
    ),
    this.#steps$$,
  ]).pipe(
    scan((acc, cur) => {
      const newVal = cur[0](acc);

      if (newVal < 0) return 0;

      if (newVal > cur[1].length - 1) return cur[1].length - 1;

      return newVal;
    }, 0),
    tap(index => {
      /* scroll steps-component */
      if (!this.stepsComponent?.nativeElement) return;
      const stepsElement: HTMLElement = this.stepsComponent?.nativeElement;
      let leftB: number = 0;
      for (let i = 0; i < index; i++)
        leftB +=
          (stepsElement.childNodes[i] as HTMLElement).getBoundingClientRect()
            .width + 16;
      stepsElement.scroll({ left: leftB, behavior: 'smooth' });
    }),
    shareReplay(),
  );

  /**
   * The current selected step.
   */
  #currentStep$: Observable<Step | null> = this.#stepIndex$.pipe(
    switchMap(index =>
      this.#steps$$.pipe(map(steps => steps.at(index) ?? null)),
    ),
    shareReplay(),
  );

  /**
   * Represents the loading-state of one image in this component.
   */
  #isLoading$$ = new BehaviorSubject<boolean>(true);

  /**
   * Represents the loading-state of one image in this component.
   */
  get isLoading$$() {
    return this.#isLoading$$;
  }

  /**
   * Represents the loading-state of one image in this component.
   */
  #isLoading$: Observable<boolean> = merge(
    this.#isLoading$$,
    this.next$$.pipe(map(() => true)),
  );

  /**
   * The data, which will be displayed in the frontend.
   */
  vm$: Observable<ViewModel> = combineLatest([
    this.#steps$$,
    this.#stepIndex$,
    this.#currentStep$,
    this.#isLoading$,
  ]).pipe(
    map(
      ([s, i, cs, il]) =>
        ({
          steps: s,
          stepIndex: i,
          currentStep: cs,
          isLoading: il,
        }) as ViewModel,
    ),
  );
}
