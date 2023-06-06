import { BaseDashboard } from "../dashboards/base-dashboard.abstract";

export abstract class SequenceComponentInit {

/**
  * Initializes the component and fetches its data.
  * This is called by the BaseDashboard if the component is displayed as part of a dashboard.
  * MUST be implemented as an async method!
  * 
  * @author: Simon (scg@mail.upb.de)
  */
  abstract initComponent(): Promise<void>;

/**
  * 
  * 
  * @param parentDashboard the BaseDashboard that this component is a part of
  * @param initID the sequence number of this component according to the order in which the dashboard components are initialized
  * 
  * @author Simon (scg@mail.upb.de)
  */
  async initBaseComponent(parentDashboard: BaseDashboard, initID : number) {
    console.log("--- Init Base Component "+ initID);
    await this.initComponent();
    parentDashboard.notifyInitializationComplete(initID);
  }
}