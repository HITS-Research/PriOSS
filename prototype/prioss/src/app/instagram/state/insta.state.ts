import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  InstaStateModel,
  InstaUserPersonalDataModel,
  InstaAdsDataModel,
  InstaUserAuthenticationDataModel,
  UserSocialConnectionModel,
  InstaUserInteractionDataModel,
  InstaUserShoppingDataModel,
  InstaUserSearchDataModel
} from "./models";
import {Injectable} from "@angular/core";
import {ResetInstaUserData, UpdateInstaUserData} from "./insta.action"
import {InstaChatData, InstaContactInfo, InstaTopicsInfo} from "../models";



@State<InstaStateModel>({
  name: 'insta',
  defaults: {
    userData: []
  },
})

@Injectable()
export class InstaState {

  constructor() {
  }

  @Selector()
  static getUserPersonalData(state: InstaStateModel): InstaUserPersonalDataModel {
    if (state.userData.length > 0) {
      const {
        personalInfo,
        professionalInfo,
        profileChanges,
        basedInInfo,
        accountInfo
      } = state.userData[state.userData.length - 1];
      return {personalInfo, professionalInfo, profileChanges, basedInInfo, accountInfo};
    } else {
      return {} as InstaUserPersonalDataModel;
    }
  }

  @Selector()
  static getAdsData(state: InstaStateModel): InstaAdsDataModel {
    if (state.userData.length > 0) {
      const {
        adsInterestInfo,
        adsActivityInfo,
        adsClickedInfo,
        adsViewedInfo,
      } = state.userData[state.userData.length - 1];
      return {adsInterestInfo, adsActivityInfo, adsClickedInfo, adsViewedInfo};
    } else {
      return {} as InstaAdsDataModel;
    }
  }

  @Selector()
  static getAuthenticationData(state: InstaStateModel): InstaUserAuthenticationDataModel {
    if (state.userData.length > 0) {
      const {
        signUpInfo,
        loginInfo,
        logoutInfo
      } = state.userData[state.userData.length - 1];
      return {signUpInfo, loginInfo, logoutInfo};
    } else {
      return {} as InstaUserAuthenticationDataModel;
    }
  }

  @Selector()
  static getSocialConnectionsData(state: InstaStateModel): UserSocialConnectionModel {
    if (state.userData.length > 0) {
      const {
        followerInfo,
        followingInfo,
        blockedInfo,
        recentFollowInfo,
        pendingFollowRequestInfo,
        recentlyUnfollowedInfo,
        removedSuggestionInfo,
        receivedFollowRequestInfo
      } = state.userData[state.userData.length - 1];
      return {
        followerInfo,
        followingInfo,
        blockedInfo,
        recentFollowInfo,
        pendingFollowRequestInfo,
        recentlyUnfollowedInfo,
        removedSuggestionInfo,
        receivedFollowRequestInfo
      };
    } else {
      return {} as UserSocialConnectionModel;
    }
  }

  @Selector()
  static getUserContacts(state: InstaStateModel): InstaContactInfo[] {
    if (state.userData.length > 0) {
      return state.userData[state.userData.length - 1].contactInfo;
    } else {
      return [];
    }
  }

  @Selector()
  static getUserInteractions(state: InstaStateModel): InstaUserInteractionDataModel {
    if (state.userData.length > 0) {
      const {likedCommentsInfo, likedPostsInfo} = state.userData[state.userData.length - 1];
      return {likedCommentsInfo, likedPostsInfo};
    } else {
      return {} as InstaUserInteractionDataModel;
    }
  }

  @Selector()
  static getUserShoppingData(state: InstaStateModel): InstaUserShoppingDataModel {
    if (state.userData.length > 0) {
      const {shoppingInfo, shoppingWishlistInfo} = state.userData[state.userData.length - 1];
      return {shoppingInfo, shoppingWishlistInfo};
    } else {
      return {} as InstaUserShoppingDataModel;
    }
  }

  @Selector()
  static getUserSearchData(state: InstaStateModel): InstaUserSearchDataModel {
    if (state.userData.length > 0) {
      const {keywordSearch, tagSearch, userSearch} = state.userData[state.userData.length - 1];
      return {keywordSearch, tagSearch, userSearch};
    } else {
      return {} as InstaUserSearchDataModel;
    }
  }

  @Selector()
  static getUserTopicData(state: InstaStateModel): InstaTopicsInfo[] {
    if (state.userData.length > 0) {
      return state.userData[state.userData.length - 1].topicsInfo;
    } else {
      return [];
    }
  }

  @Selector()
  static getUserChatData(state: InstaStateModel): InstaChatData[] {
    if (state.userData.length > 0) {
      return state.userData[state.userData.length - 1].chatData;
    } else {
      return [];
    }
  }

  @Action(UpdateInstaUserData)
  updateUser(ctx: StateContext<InstaStateModel>, {userData}: UpdateInstaUserData) {
    const state = ctx.getState();
    state.userData[state.userData.length] = userData;
    ctx.patchState(state);
  }

  @Action(ResetInstaUserData)
  resetUser(ctx: StateContext<InstaStateModel>) {
    ctx.setState({userData:[]} as InstaStateModel);
  }
}
