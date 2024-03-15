import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  FbActivityAcrossFacebookModel,
  FbAdsInformationModel,
  FbAppsAndWebsitesOffOfFacebookDataModel,
  FbPersonalInformationDataModel,
  FbPreferencesDataModel,
  FbSecurityLoginInformationDataModel,
  FbStateModel,
  FbUserDataModel,
} from './models';
import { Injectable } from '@angular/core';
import { ResetFbUserData, UpdateFbUserData } from './fb.action';
import FbConnectionsDataModel from './models/fb-connections-data-model.interface';
import FbLoggedInformationDataModel from './models/fb-logged-information-data-model.interface';

@State<FbStateModel>({
  name: 'fb',
  defaults: { user_data: [] },
})
@Injectable()
export class FacebookState {
  constructor() {}

  @Action(ResetFbUserData)
  resetUser(ctx: StateContext<FbStateModel>) {
    ctx.setState({user_data:[]} as FbStateModel);
  }

  @Action(UpdateFbUserData)
  updateUser(ctx: StateContext<FbStateModel>, {user_data}: UpdateFbUserData) {
    const state = ctx.getState();
    state.user_data.push(user_data);
    ctx.patchState(state);
  }

  @Selector()
  static getFacebookUserData(state: FbStateModel): FbUserDataModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1];
    } else {
      return {} as FbUserDataModel;
    }
  }

  @Selector()
  static getFacebookActivityAcrossFacebookData(
    state: FbStateModel
  ): FbActivityAcrossFacebookModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1]
        .activity_across_facebook;
    } else {
      return {} as FbActivityAcrossFacebookModel;
    }
  }

  @Selector()
  static getFacebookAdsInformationData(
    state: FbStateModel
  ): FbAdsInformationModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1].ads_and_businesses;
    } else {
      return {} as FbAdsInformationModel;
    }
  }

  @Selector()
  static getFacebookAppsAndWebsitesOffOfFacebookData(
    state: FbStateModel
  ): FbAppsAndWebsitesOffOfFacebookDataModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1]
        .apps_and_websites_off_of_fb;
    } else {
      return {} as FbAppsAndWebsitesOffOfFacebookDataModel;
    }
  }

  @Selector()
  static getFacebookConnectionsData(
    state: FbStateModel
  ): FbConnectionsDataModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1].connections;
    } else {
      return {} as FbConnectionsDataModel;
    }
  }

  @Selector()
  static getFacebookSecurityLoginInformationData(
    state: FbStateModel
  ): FbSecurityLoginInformationDataModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1]
        .security_and_login_information;
    } else {
      return {} as FbSecurityLoginInformationDataModel;
    }
  }

  @Selector()
  static getFacebookPersonalInformationData(
    state: FbStateModel
  ): FbPersonalInformationDataModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1].personal_information;
    } else {
      return {} as FbPersonalInformationDataModel;
    }
  }

  @Selector()
  static getFacebookLoggedInformationData(
    state: FbStateModel
  ): FbLoggedInformationDataModel {
    if (state.user_data.length > 0) {
        return state.user_data[state.user_data.length - 1].logged_information;
    } else {
      return {} as FbLoggedInformationDataModel;
    }
  }

  @Selector()
  static getFacebookPreferencesData(
    state: FbStateModel
  ): FbPreferencesDataModel {
    if (state.user_data.length > 0) {
      return state.user_data[state.user_data.length - 1].preferences;
    } else {
      return {} as FbPreferencesDataModel;
    }
  }
}
