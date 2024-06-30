import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { NgxEchartsModule, provideEcharts } from "ngx-echarts";
import type { FbConnectionsDataModel } from "src/app/facebook/state/models";
import { FacebookFriendsGeneralInfoComponent } from "./features/facebook-friends-general-info/facebook-friends-general-info.component";
import { FacebookFriendsFollowingOverTimeComponent } from "./features/facebook-friends-following-over-time/facebook-friends-following-over-time.component";
import { FacebookFriendsOverTimeComponent } from "./features/facebook-friends-over-time/facebook-friends-over-time.component";

@Component({
	selector: "prioss-facebook-friends-statistics",
	standalone: true,
	imports: [
		NzCardModule,
		NzStatisticModule,
		NgxEchartsModule,
		NzGridModule,
		FormsModule,
		CommonModule,
		FacebookFriendsGeneralInfoComponent,
		FacebookFriendsFollowingOverTimeComponent,
		FacebookFriendsOverTimeComponent,
	],
	providers: [provideEcharts()],
	templateUrl: "./friends-statistics.component.html",
	styleUrl: "./friends-statistics.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacebookFriendsStatisticsComponent {
	loading = input<boolean>(true);
	friendsData = input.required<FbConnectionsDataModel>();
}
