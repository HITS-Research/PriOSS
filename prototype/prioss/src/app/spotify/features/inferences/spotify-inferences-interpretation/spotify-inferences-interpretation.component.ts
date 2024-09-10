import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CapitalizePipe } from 'src/app/features/naming/capitalize.pipe';
import { SpotifyInferenceState } from '../inference.state';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'prioss-spotify-inferences-interpretation',
  templateUrl: './spotify-inferences-interpretation.component.html',
  styleUrl: './spotify-inferences-interpretation.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzEmptyModule, NzCardModule, NzDividerModule, CapitalizePipe],
})
export class SpotifyInferencesInterpretationComponent {
  #store = inject(Store);

  #relation = new Map<string, string>([
    ['streamer', 'listener'],
    ['podcast', 'listener'],
    ['drinker', 'consumer'],
    ['early adopter', 'consumer'],
    ['cinema goers', 'consumer'],
    ['user', 'consumer'],
    ['vacationer', 'holiday'],
    ['gamer', 'lifestyle'],
    ['games', 'lifestyle'],
    ['player', 'lifestyle'],
    ['culture', 'lifestyle'],
    ['art', 'lifestyle'],
    ['marathon runner', 'lifestyle'],
    ['cosmetic', 'lifestyle'],
    ['cooking', 'lifestyle'],
    ['goer', 'lifestyle'],
    ['owner', 'buyer'],
    ['shopper', 'buyer'],
    ['shopping', 'buyer'],
    ['intender', 'buyer'],
    ['phone', 'mobile'],
    ['laptop', 'mobile'],
    ['samsung', 'mobile'],
    ['android', 'mobile'],
    ['iphone', 'mobile'],
    ['ios', 'mobile'],
    ['apple', 'mobile'],
    ['tablet', 'mobile'],
    ['travel', 'holiday'],
  ]);

  inferences = computed(() => {
    const inferences = this.#store.selectSignal(
      SpotifyInferenceState.inferences,
    )();
    const inferenceWithCountries = new Map<string, string[]>();
    for (const inference of inferences) {
      if (inference.match(/_[A-Z]{2}$/)) {
        const key = inference.substring(0, inference.length - 3);
        const value = inference.substring(inference.length - 2);
        const countries = inferenceWithCountries.get(key) ?? [];
        countries.push(value);
        inferenceWithCountries.set(key, countries);
      } else {
        inferenceWithCountries.set(inference, []);
      }
    }

    const result: string[] = [];
    for (const kvp of inferenceWithCountries) {
      let key = kvp[0].split('_').join(' ');
      if (key.startsWith('1P ') || key.startsWith('3P '))
        key = `[${key.substring(0, 2)}] ${key.substring(3).trim()}`;

      const values = kvp[1].join(', ');
      if (values.length > 0) {
        result.push(`${key} (${values})`);
      } else {
        result.push(key);
      }
    }

    return [...result.values()].sort((a, b) => a.localeCompare(b));
  });

  sources = signal<Map<string, string>>(
    new Map([
      [
        'listener',
        'https://bestfriendsclub.ca/the-difference-between-streams-listeners-on-spotify/',
      ],
    ]),
  );

  descriptions = signal<Map<string, string>>(
    new Map([
      [
        'enthusia',
        'An "enthusiast" could be someone who shows a strong interest or passion for something. In the analysis, this could be a user who spends a lot of time with it.',
      ],
      [
        'listener',
        'Spotify only counts a listener as a listener if they have streamed [a] song at least once past the 30 second mark.',
      ],
      [
        'consumer',
        'A "consumer" is a general term for someone who consumes something.',
      ],
      [
        'owner',
        '"Owner" could refer to someone who is the owner of a particular device or subscription associated with Spotify or something else. It could also refer to someone who owns and manages certain things. A "buyer" is likely to be someone who carries out financial transactions on the platform. This could include the purchase of merchandise, concert tickets, premium subscriptions or even certain digital content.',
      ],
      [
        'income',
        '"Income" is likely to refer to user income. In the analysis, this could be used to define user segments based on their estimated income, which in turn could influence their purchasing power and subscription choices.',
      ],
      ['user', ''],
      ['other', 'Not fit in any of the above categories.'],
    ]),
  );

  titles = signal<Map<string, string>>(
    new Map([
      ['enthusia', 'Enthusiast'],
      ['listener', 'Listener / Streamer'],
      ['streamer', 'Streamer'],
      ['consumer', 'Consumer / User'],
      ['buyer', 'Buyer / Owner'],
      ['lifestyle', 'Your Lifestyle'],
      ['income', 'Your Income'],
      ['luxury', 'Luxury'],
      ['holiday', 'Holiday / Vacation / Traveling'],
      ['mobile', 'Mobile Devices'],
      ['other', 'Other'],
    ]),
  );

  lists = computed(() => {
    const inferences = this.inferences();
    const lists = new Map<string, Set<string>>([
      ['enthusia' /* sts, st, tic, ... */, new Set()],
      ['listener', new Set()],
      ['consumer', new Set()],
      ['buyer', new Set()],
      ['lifestyle', new Set()],
      ['income', new Set()],
      ['luxury', new Set()],
      ['holiday', new Set()],
      ['mobile', new Set()],
      ['other', new Set()],
    ]);

    for (const inference of inferences) {
      const hasCategorie = this.#addToCategory(inference, lists);
      const hasReation = this.#addRelatedCategories(inference, lists);

      if (!hasCategorie && !hasReation) lists.get('other')?.add(inference);
    }

    return lists;
  });

  #addToCategory(inference: string, lists: Map<string, Set<string>>) {
    const lower = inference.toLowerCase();
    let hasCategorie = false;
    for (const key of lists.keys()) {
      if (key === 'other') continue;

      if (lower.includes(key)) {
        lists.get(key)!.add(inference);
        hasCategorie = true;
      }
    }
    return hasCategorie;
  }

  #addRelatedCategories(inference: string, lists: Map<string, Set<string>>) {
    const lower = inference.toLowerCase();
    let hasRelation = false;
    for (const kvp of this.#relation) {
      const key = kvp[0];
      const value = kvp[1];
      if (lower.includes(key)) {
        lists.get(value)!.add(inference);
        hasRelation = true;
      }
    }
    return hasRelation;
  }

  filteredList = computed(() => {
    const list = this.lists();
    const filtered = new Map<string, string[]>();

    for (const kvp of list) {
      if (kvp[1].size > 0)
        filtered.set(
          kvp[0],
          [...kvp[1].values()].sort((a, b) => a.localeCompare(b)),
        );
    }

    return filtered;
  });
}
