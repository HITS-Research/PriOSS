import {AfterViewInit, Component, Input, OnInit,} from '@angular/core';
import {Router} from '@angular/router';
import * as utilities from 'src/app/features/utils/generalUtilities.functions'
import {
    InstaPersonalRepository
} from 'src/app/db/data-repositories/instagram/insta-personal-info/insta-personal.repository';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';
import {
    InstaAccountInfo,
    InstaBasedInInfo,
    InstaPersonalInfo,
    InstaProfessionalInfo,
    InstaProfileChange
} from "../../models";
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";


/**
 * This component is the visualization component on instagram's dashboard page.
 * This page is shown when the user clicks on the personal information card on instagram's dashboard.
 *
 * @author: Aayushma & Paul (aayushma@uni-paderborn.de & pasch@mail.upb.de)
 */
@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.less']
})

export class Insta_PersonalInfoComponent extends SequenceComponentInit implements AfterViewInit, OnInit {
    @Input()
    previewMode = false;

    personalInfo: InstaPersonalInfo;
    accountInfo: InstaAccountInfo;
    professionalInfo: InstaProfessionalInfo;
    basedInInfo: InstaBasedInInfo;
    profileChanges: InstaProfileChange[] = [];

    getObjectPairs: (obj: object) => [string, any][] = utilities.getObjectPairs;
    convertTimestamp: (str: string) => any = utilities.convertTimestamp;
    capitalizeAndPrettify: (str: string) => string = utilities.capitalizeAndPrettify;

    constructor(private router: Router, private instaPersonalRepo: InstaPersonalRepository, private store: Store) {
        super();
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

    ngOnInit() {
        Object.assign(this, {...this.store.selectSnapshot(InstaState.getUserPersonalData)});
    }

    /**
     * @see-super-class
     * @author: Paul (pasch@mail.upb.de)
     */
    override async initComponent(): Promise<void> {
    }

    /**
     * This method is responsible to navigate to guidelines to make Instagram Account Private.
     *
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     *
     */

    handleButtonClick1() {
        window.open('insta/account-private', '_blank');
    }

    /**
     * This method is responsible to navigate to guidelines to make Instagram account's profile information private.
     *
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     *
     */

    handleButtonClick2() {
        window.open('insta/profile-info-private', '_blank');
    }

}

