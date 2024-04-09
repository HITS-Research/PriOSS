import {
	Component,
	type OnInit,
	ChangeDetectionStrategy,
	signal,
	computed,
	input,
	effect,
} from "@angular/core";
import { scrollToTop } from "src/app/features/utils/generalUtilities.functions";
import type { FbConnectionsDataModel } from "../../state/models";
import { FacebookState } from "../../state/fb.state";
// biome-ignore lint/style/useImportType: <explanation>
import { Store } from "@ngxs/store";
import { FormsModule } from "@angular/forms";
import { NzIconModule } from "ng-zorro-antd/icon";
import { CommonModule } from "@angular/common";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzStatisticModule } from "ng-zorro-antd/statistic";
import { FacebookFriendsGeneralInfoComponent } from "./features/friends-statistics/features/facebook-friends-general-info/facebook-friends-general-info.component";
import { FacebookFriendsOverviewComponent } from "./features/friends-overview/friends-overview.component";
import { FacebookFriendsStatisticsComponent } from "./features/friends-statistics/friends-statistics.component";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzCardModule } from "ng-zorro-antd/card";
import { TitleBarComponent } from "src/app/features/title-bar/title-bar.component";

export class chartData {
	year: number;
	count: number;
}
@Component({
	standalone: true,
	imports: [
		FormsModule,
		NzStatisticModule,
		NzGridModule,
		CommonModule,
		NzIconModule,
    NzTabsModule,
    NzCardModule,
    TitleBarComponent,
		FacebookFriendsGeneralInfoComponent,
		FacebookFriendsOverviewComponent,
    FacebookFriendsStatisticsComponent
	],
	providers: [],
	selector: "app-friend-and-followers",
	templateUrl: "./friend-and-followers.component.html",
	styleUrls: ["./friend-and-followers.component.less"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendAndFollowersComponent implements OnInit {
	connectionsDatastore = signal<FbConnectionsDataModel>(
		{} as FbConnectionsDataModel,
	);

	//preview statistics
	friendsCount = computed(() => {
		return this.connectionsDatastore().yourFriends?.friends_v2.length ?? 0;
	});
	sentFriendRequestsCount = computed(() => {
		return (
			this.connectionsDatastore().sentFriendRequests?.sent_requests_v2.length ??
			0
		);
	});
	receivedFriendsCount = computed(() => {
		return (
			this.connectionsDatastore().receivedFriendRequests?.received_requests_v2
				.length ?? 0
		);
	});
	rejectedFriendsCount = computed(() => {
		return (
			this.connectionsDatastore().rejectedFriendRequests?.rejected_requests_v2
				.length ?? 0
		);
	});
	removedFriendsCount = computed(() => {
		return (
			this.connectionsDatastore().removedFriends?.deleted_friends_v2.length ?? 0
		);
	});
	followingCount = computed(() => {
		return this.connectionsDatastore().followed?.following_v3.length ?? 0;
	});
	peopleyouMayKnowCount = computed(() => {
		return (
			this.connectionsDatastore().peopleYouMayKnow?.label_values[0].vec
				.length ?? 0
		);
	});

	previewModeInput = input<string>();
	previewMode = computed(() => {
		return this.previewModeInput() === "true";
	});
	constructor(private store: Store) {
		effect(() => {
			console.log("previewModeInput", this.previewModeInput());
			console.log("previewMode", this.previewMode());
		});
	}

	ngOnInit() {
		scrollToTop();
		this.connectionsDatastore.set(
			this.store.selectSnapshot(FacebookState.getFacebookConnectionsData),
		);
		console.log(this.connectionsDatastore());
	}
}
