import { Injectable } from "@angular/core";
import { Action, State, StateContext } from '@ngxs/store';
import { SpotifyReadPaymentsFromZip, SpotifyResetPayments } from './payments.actions';
import { SpotifyPaymentsStateModel } from './payments.statemodel';

/**
 * The default values of this state.
 */
const defaults: SpotifyPaymentsStateModel[] = [];

/**
 * The state of payment data of the users zip file.
 */
@State<SpotifyPaymentsStateModel[]>({
  name: 'spotifyPayment',
  defaults: defaults,
})
@Injectable()
export class SpotifyPaymentState {

  /**
   * Resets the Payment-State.
   */
  @Action(SpotifyResetPayments)
  resetPayment(context: StateContext<SpotifyPaymentsStateModel[]>) {
    context.setState(defaults);
  }

  /**
   * Reads and initializes the Payment-State by the given zip file.
   */
  @Action(SpotifyReadPaymentsFromZip)
  async readPaymentFromZip(
    context: StateContext<SpotifyPaymentsStateModel[]>,
    { zip }: SpotifyReadPaymentsFromZip
  ) {
    // TODO: Check name in other zips
    const FILE_NAME: string = 'Payments.json';

    const fileName = Object.keys(zip.files)
      .find(f => f.split('/').at(-1) === FILE_NAME);
    if (!fileName) return;

    const file = zip.file(fileName);
    if (!file) return;

    // TODO: Check for multiple payments. (Maybe) If only one is available, you get only the object, not an array.
    const fileContent: SpotifyPaymentsStateModel[] = JSON.parse(
      await file.async('string')
    );
    context.setState([fileContent].flat());
  }

}
