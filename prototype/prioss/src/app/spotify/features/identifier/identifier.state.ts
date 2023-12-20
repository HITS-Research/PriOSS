import { Injectable } from "@angular/core";

import { Action, State, StateContext } from '@ngxs/store';
import { SpotifyReadIdentifiersFromZip, SpotifyResetIdentifiers } from './identifier.action';
import { SpotifyIdentifiersStateModel } from './identifier.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyIdentifiersStateModel = {
  identifierType: '',
  identifierValue: ''
};

/**
 * The state of identifier data of the users zip file.
 */
@State<SpotifyIdentifiersStateModel>({
  name: 'spotifyIdentifierss',
  defaults: defaults,
})
@Injectable()
export class SpotifyIdentifiersState {

  /**
   * Resets the Identifier-State.
   */
  @Action(SpotifyResetIdentifiers)
  resetIdentifierss(context: StateContext<SpotifyIdentifiersStateModel>): void {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Identifier-State by the given zip file.
   */
  @Action(SpotifyReadIdentifiersFromZip)
  async readIdentifierssFromZip(
    context: StateContext<SpotifyIdentifiersStateModel>,
    { zip }: SpotifyReadIdentifiersFromZip
  ): Promise<void> {
    const FILE_NAME = 'Identifiers.json';

    const fileName = Object.keys(zip.files)
      .find(f => f.split('/').at(-1) === FILE_NAME);
    if (!fileName) return;

    const file = zip.file(fileName);
    if (!file) return;

    // TODO: Check for multiple identifiers. (Maybe) If only one is available, you get only the object, not an array.
    const fileContent: SpotifyIdentifiersStateModel = JSON.parse(
      await file.async('string')
    );

    if (Array.isArray(fileContent))
      context.setState(fileContent.sort());
  }

}
