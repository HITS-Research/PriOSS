import { SequenceComponentInit } from "../visualizations/sequence-component-init.abstract";

export abstract class BaseDashboard {

  componentInitializationList: SequenceComponentInit[];

  startSequentialInitialization() {
    console.log("--- Starting Sequential Initialization");
    this.componentInitializationList[0].initBaseComponent(this, 0);
  }

  notifyInitializationComplete(initID: number): void {
    
    console.log("--- Initialization Complete for component " + initID);
    let nextInitID = initID + 1;

    if(nextInitID < this.componentInitializationList.length) {
      this.componentInitializationList[nextInitID].initBaseComponent(this, nextInitID);
    }
  }
}