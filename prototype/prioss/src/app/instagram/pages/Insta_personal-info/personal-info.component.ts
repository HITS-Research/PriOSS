import {AfterViewInit, Component, Input, OnInit,} from '@angular/core';
import {Router} from '@angular/router';
import * as utilities from 'src/app/features/utils/generalUtilities.functions'
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
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { RemoveSpecialCharactersPipe } from 'src/app/features/remove-special-characters/remove-special-characters.pipe';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { PascalSpacingPipe } from 'src/app/features/pascal-spacing/pascal-spacing.pipe';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';



/**
 * This component is the visualization component on instagram's dashboard page.
 * This page is shown when the user clicks on the personal information card on instagram's dashboard.
 *
 * @author: Aayushma & Paul (aayushma@uni-paderborn.de & pasch@mail.upb.de)
 */
@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.less'],
    standalone: true,
    imports: [
      NgClass,
      NgFor,
      NgIf,
      NzCardModule,
      NzGridModule,
      NzIconModule,
      NzImageModule,
      NzSpaceModule,
      NzSpinModule,
      NzStatisticModule,
      NzTableModule,
      NzTimelineModule,
      NzToolTipModule,
      PascalSpacingPipe,
      RemoveSpecialCharactersPipe,
      TitleBarComponent,
    ]
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

    constructor(private router: Router,private store: Store) {
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

    handleButtonClick1(event: Event) {
        event.preventDefault();
        window.open('instagram/account-private', '_blank');
    }

    /**
     * This method is responsible to navigate to guidelines to make Instagram account's profile information private.
     *
     * @author: Aayushma (aayushma@mail.uni-paderborn.de)
     *
     */

    handleButtonClick2(event: Event) {
        event.preventDefault();
        window.open('instagram/profile-info-private', '_blank');
    }

}

