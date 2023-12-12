/**
 * A Step inside the prioss-stepper-component
 */
export type Step = {

  /**
   * The title of the step.
   * Will displayed next to the Position.
   */
  title: string;

  /**
   * The sub-title of the step.
   * Will displayed below the Title.
   */
  subtitle?: string;

  /**
   * The image-url to visualize this step.
   */
  imageUrl: string;

  /**
   * The text to describe the text.
   * Can have HTML-elements inside.
   */
  description: string;

};
