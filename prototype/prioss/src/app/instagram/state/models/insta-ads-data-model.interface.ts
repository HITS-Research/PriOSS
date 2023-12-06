import {
    InstaAdsActivityInfo, InstaAdsClickedInfo, InstaAdsInterestInfo, InstaAdsViewedInfo,

} from "../../models";

export default interface InstaAdsDataModel {
    adsInterestInfo: InstaAdsInterestInfo[];
    adsActivityInfo: InstaAdsActivityInfo[];
    adsClickedInfo: InstaAdsClickedInfo[];
    adsViewedInfo: InstaAdsViewedInfo[];
}
