import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SpotifyReadInferencesFromZip, SpotifyResetInferences } from './inference.action';
import { SpotifyInferenceStateModel } from './inference.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyInferenceStateModel = { inferences: [] };

/**
 * The state of inference data of the users zip file.
 */
@State<SpotifyInferenceStateModel>({
  name: 'spotifyInferences',
  defaults: defaults,
})
@Injectable()
export class SpotifyInferenceState {

  /**
   * Isolates the 'inferences' property of SpotifyInferenceStateModel 
   * so it can be accessed individually
   */
  @Selector()
  static inferences(state: SpotifyInferenceStateModel): string[] {
    return state.inferences;
  }

  /**
   * Resets the Inference-State.
   */
  @Action(SpotifyResetInferences)
  resetInferences(context: StateContext<SpotifyInferenceStateModel>): void {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Inference-State by the given zip file.
   */
  @Action(SpotifyReadInferencesFromZip)
  async readInferencesFromZip(
    context: StateContext<SpotifyInferenceStateModel>,
    { zip }: SpotifyReadInferencesFromZip
  ): Promise<void> {
    const FILE_NAME = 'Inferences.json';

    const fileName = Object.keys(zip.files)
      .find(f => f.split('/').at(-1) === FILE_NAME);
    if (!fileName) return;

    const file = zip.file(fileName);
    if (!file) return;

    const fileContent: SpotifyInferenceStateModel = JSON.parse(
      await file.async('string')
    );
    if (Array.isArray(fileContent.inferences))
      context.setState(fileContent);
  }

}
