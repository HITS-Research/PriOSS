import { Component, Input, ChangeDetectionStrategy, OnInit, signal, computed } from '@angular/core';
import { Store } from '@ngxs/store';
import { FbUserDataModel } from '../../state/models';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { ProfileInformationModel } from '../../models';
import { IndexedDbService } from 'src/app/state/indexed-db.state';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';
/**
 * This component visualizes the general data of the user.
 * The data is displayed in a table format that is automatically generated based on the available data
 *
 *
 * @author: Max (maxy@mail.upb.de)
 *
 */
@Component({
  selector: 'app-general-data',
  standalone: true,
  imports: [
    NzEmptyModule,
    NzTableModule,
    NzGridModule,
    NzCardModule,
    TitleCasePipe,
    NzSkeletonComponent,
    NzStatisticModule,
    CommonModule,
    TitleBarComponent
  ],
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralDataComponent implements OnInit {


  userdata = signal<FbUserDataModel>({} as FbUserDataModel);
  loading = signal<boolean>(true);
  profileInfo = computed(() =>
    this.userdata().personal_information?.profile_information ?? {} as ProfileInformationModel
  );

  birthdate = computed(() => {
    const bday = this.profileInfo().profile_v2?.birthday
    if (bday) {
      let date ='';
      if(bday.year){
        date = `${bday.year}`;
      }
      if(bday.month){
        date = `${date}-${bday.month}`;
      }
      if(bday.day){
        date = `${date}-${bday.day}`;
      }
      return date;
    }
    return bday;
  });

  name = computed(() => this.profileInfo().profile_v2?.name?.full_name??'No Data');
  gender = computed(() => this.profileInfo().profile_v2?.gender?.gender_option ?? 'No Data');
  activeEmails = computed(() => this.profileInfo().profile_v2?.emails?.emails ?? []);
  previousEmails= computed(() => this.profileInfo().profile_v2?.emails?.previous_emails ?? []);
  phonenumbers = computed(() => this.profileInfo().profile_v2?.phone_numbers ?? []);
  bloodDonorStatus = computed(() => this.profileInfo().profile_v2?.blood_info?.blood_donor_status ?? 'No Data');
  relationshipStatus = computed(() => this.profileInfo().profile_v2?.relationship?.status ?? 'No Data');
  currentRelationShipStartDate = computed(() => this.profileInfo().profile_v2?.relationship?.timestamp ??0);
  previousRelationships = computed(() => this.profileInfo().profile_v2?.previous_relationships ?? []);
  familyMembers = computed(() => this.profileInfo().profile_v2?.family_members ?? []);
  education = computed(() => this.profileInfo().profile_v2?.education_experiences ?? []);
  work = computed(() => this.profileInfo().profile_v2?.work_experiences ?? []);
  @Input()
  previewMode = false;

  constructor(private store: Store, private indexedDb: IndexedDbService) {
  }

  async ngOnInit() {
    await this.indexedDb.getSelectedFacebookDataStore()
      .then((data) => {
        if(!data.facebookData){
          this.userdata.set({} as FbUserDataModel);
        }else{
          this.userdata.set(data.facebookData);
        }
      })
      .finally(() => this.loading.set(false));

  }
}
