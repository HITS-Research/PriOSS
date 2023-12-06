import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';
import {InstaAdsActivityInfo} from 'src/app/instagram/models/LikedAdsInfo/InstaAdsActivityInfo';
import {InstaAdsClickedInfo} from 'src/app/instagram/models/LikedAdsInfo/InstaAdsClickedInfo';
import {InstaAdsInterestInfo} from 'src/app/instagram/models/LikedAdsInfo/InstaAdsInterestInfo';
import {InstaAdsViewedInfo} from 'src/app/instagram/models/LikedAdsInfo/InstaAdsViewedInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";


/**
 * This component is fsor instagram's advertisement page.
 * This page is shown once a user visits the advertisement tab in instagram dashboard
 *
 * @author: Aayushma & Mayank (aayushma@mail.uni-paderborn.de & mayank@mail.upb.de)
 *
 */
@Component({
    selector: 'app-insta-ads',
    templateUrl: './insta-ads.component.html',
    styleUrls: ['./insta-ads.component.less']
})
export class InstaAdsComponent extends SequenceComponentInit implements AfterViewInit, OnInit {

    @Input()
    previewMode = false;
    activitySearchValue = '';
    clickedSearchValue = '';
    viewedSearchValue = '';
    interestSearchValue = '';
    visible = false;

    sortClickedDate = (a: InstaAdsClickedInfo, b: InstaAdsClickedInfo): number => +a.timestamp - +b.timestamp;
    sortViewedDate = (a: InstaAdsViewedInfo, b: InstaAdsViewedInfo): number => +a.timestamp - +b.timestamp;

    ads_activity: InstaAdsActivityInfo[] = [];
    listOfAdsActivity: InstaAdsActivityInfo[] = [];
    ads_clicked: InstaAdsClickedInfo[] = [];
    listOfAdsClicked: InstaAdsClickedInfo[] = [];
    ads_interests: InstaAdsInterestInfo[] = [];
    listOfAdsInterests: InstaAdsInterestInfo[] = [];
    ads_viewed: InstaAdsViewedInfo[] = [];
    listOfAdsViewed: InstaAdsViewedInfo[] = [];

    constructor(private store: Store) {
        super();
    }

    ngOnInit() {
        const {adsInterestInfo, adsActivityInfo, adsClickedInfo, adsViewedInfo} = this.store.selectSnapshot(InstaState.getAdsData);
        this.ads_activity = adsActivityInfo;
        this.ads_clicked = adsClickedInfo;
        this.ads_interests = adsInterestInfo;
        this.ads_viewed = adsViewedInfo;
        this.listOfAdsActivity = [...this.ads_activity];
        this.listOfAdsClicked = [...this.ads_clicked];
        this.listOfAdsInterests = [...this.ads_interests];
        this.listOfAdsViewed = [...this.ads_viewed];
    }

    /**
     * A Callback called by angular when the views have been initialized
     * It handles the initialization when the component is displayed on its own dedicated page.
     *
     * @author: Paul (pasch@mail.upb.de)
     */
    ngAfterViewInit() {
        if (!this.previewMode) {
            this.initComponent();
        }
    }

    /**
     * @see-super-classn
     * @author: Paul (pasch@mail.upb.de)
     */
    override async initComponent() {
        console.log("--- Initializing Component 1: Advertisement");
    }

    /**
     * Resets the given searchvalue.
     *
     * @param searchList the list that should be resetted.
     *
     * @author: Paul (pasch@mail.upb.de)
     */
    reset(searchList: string): void {
        switch (searchList) {
            case 'activity':
                this.activitySearchValue = '';
                break;
            case 'clicked':
                this.clickedSearchValue = '';
                break;
            case 'viewed':
                this.viewedSearchValue = '';
                break;
            case 'interest':
                this.interestSearchValue = '';
                break;
            default:
                break;
        }

        this.search(searchList);
    }


    /**
     * Searches the given list for the current searchvalue.
     *
     * @param searchList the list that should be searched.
     *
     * @author: Paul (pasch@mail.upb.de)
     */
    search(searchList: string): void {
        this.visible = false;

        switch (searchList) {
            case 'activity':
                this.listOfAdsActivity = this.ads_activity.filter((item: InstaAdsActivityInfo) => item.advertiserName.toLowerCase().indexOf(this.activitySearchValue.toLowerCase()) !== -1);
                break;
            case 'clicked':
                this.listOfAdsClicked = this.ads_clicked.filter((item: InstaAdsClickedInfo) => item.title.toLowerCase().indexOf(this.clickedSearchValue.toLowerCase()) !== -1);
                break;
            case 'viewed':
                this.listOfAdsViewed = this.ads_viewed.filter((item: InstaAdsViewedInfo) => item.title.toLowerCase().indexOf(this.viewedSearchValue.toLowerCase()) !== -1);
                break;
            case 'interest':
                this.listOfAdsInterests = this.ads_interests.filter((item: InstaAdsInterestInfo) => item.interest.toLowerCase().indexOf(this.interestSearchValue.toLowerCase()) !== -1);
                break;
            default:
                break;
        }
    }


    /**
     * This method is responsible to navigate to guidelines to control which advertisements show on your Instagram account.
     *
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     *
     */
    navigateToRectification() {
        window.open('insta/add-manager', '_blank');
    }

}
