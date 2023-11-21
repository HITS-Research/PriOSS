import { SequenceComponentInit } from "./sequence-component-init.abstract";

export abstract class BaseDashboard {

/**
  * List of components to be initialized in the order in which they appear in the list
  */
  componentInitializationList: SequenceComponentInit[];

/**
  * Starts initializing all components present in the componentInitializationList
  *
  * @author Simon (scg@mail.upb.de)
  */
  startSequentialInitialization() {
    console.log("--- Starting Sequential Initialization");
    this.componentInitializationList[0].initBaseComponent(this, 0);
  }

/**
  * notifies the dashboard that the current component initialization is complete and starts the subsequent component initialization
  *
  * @param initID the sequence number of this component according to the order in which the dashboard components are initialized
  *
  * @author Simon (scg@mail.upb.de)
  */
  notifyInitializationComplete(initID: number): void {

    console.log("--- Initialization Complete for component " + initID);
    const nextInitID = initID + 1;

    if(nextInitID < this.componentInitializationList.length) {
      this.componentInitializationList[nextInitID].initBaseComponent(this, nextInitID);
    }
  }
}
