import { Component, Input, ChangeDetectionStrategy, OnInit, signal, computed } from '@angular/core';
import { Store } from '@ngxs/store';
import { FacebookState } from '../../state/fb.state';
import { FbUserDataModel } from '../../state/models';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from 'src/app/features/title-bar/title-bar.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { ProfileInformationModel } from '../../models';
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

  profileInfo = computed(() =>
    this.userdata().personal_information.profile_information ?? {} as ProfileInformationModel
  );

  birthdate = computed(() => {
    const bday = this.profileInfo()?.profile_v2.birthday.year.toString() ?? '0000'
      + '-'
      + this.profileInfo()?.profile_v2.birthday.month.toString() ?? '00'
      + '-'
      + this.profileInfo()?.profile_v2.birthday.day.toString() ?? '00';
    return bday;
  }

  );

  @Input()
  previewMode = false;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.userdata.set(this.store.selectSnapshot(FacebookState.getFacebookUserData));
  }
}
