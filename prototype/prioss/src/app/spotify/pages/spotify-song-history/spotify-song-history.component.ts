import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { map } from 'rxjs';
import { TimePipe } from 'src/app/features/time/time.pipe';
import { SpotifyStreamingHistoryState } from '../../features/streaming-history/streaming-history.state';

@Component({
  selector: 'prioss-spotify-song-history',
  templateUrl: './spotify-song-history.component.html',
  styleUrl: './spotify-song-history.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzEmptyModule,
    NzPageHeaderModule,
    NzTableModule,
    TimePipe,
  ],
})
export class SpotifySongHistoryComponent {
  #store = inject(Store);

  #router = inject(Router);

  #activatedRoute = inject(ActivatedRoute);

  /**
   * The values from the parameters.
   */
  parameter = toSignal(this.#activatedRoute.paramMap.pipe(map(x => ({
    artist: x.get('artist'),
    song: x.get('song')
  }))));

  fullName = computed(() => {
    const parameter = this.parameter();
    if (!parameter) return '';

    const { artist, song } = parameter;
    if (!artist || !song) return '';

    return `${artist} - ${song}`;
  });

  /**
   * The complete streaming history.
   */
  streamingHistory = toSignal(this.#store.select(SpotifyStreamingHistoryState.state));

  /**
   * The list of all dates, where the user listended to the given song.
   */
  songHistory = computed(() => {
    const rawData = this.streamingHistory();
    const parameters = this.parameter();
    if (!parameters) return [];

    const { artist, song } = parameters;
    return rawData?.filter(d => d.artistName === artist && d.trackName === song);
  });

  /**
   * Navigate back to the top-songs page.
   */
  onBackFromSong(): void {
    this.#router.navigate(['spot', 'top-songs']);
  }

}
