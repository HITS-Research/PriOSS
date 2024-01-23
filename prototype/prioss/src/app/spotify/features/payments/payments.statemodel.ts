/**
 * The Payment-State scheme.
 */
export type SpotifyPaymentsStateModel = {

  /**
   * The two character country identifier.
   */
  country: string;

  /**
   * The date, when the payment has been created.
   */
  creation_date: string;

  /**
   * The method, how the payment was done (e.g. visa <censored-card-number>)
   */
  payment_method: string;

};
