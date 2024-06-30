import {
	Component,
	type OnInit,
	ChangeDetectionStrategy,
	signal,
	computed,
	input,
} from "@angular/core";
import { scrollToTop } from "src/app/features/utils/generalUtilities.functions";
import { FbUserDataModel, type FbConnectionsDataModel } from "../../state/models";
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
import { IndexedDbService } from "src/app/state/indexed-db.state";
import { NzSkeletonModule } from "ng-zorro-antd/skeleton";
import { FacebookFriendsOverTimeComponent } from "./features/friends-statistics/features/facebook-friends-over-time/facebook-friends-over-time.component";


export class chartData {
	year: number;
	count: number;
}
@Component({
	standalone: true,
	imports: [
		NzSkeletonModule,
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
		FacebookFriendsStatisticsComponent,
		FacebookFriendsOverTimeComponent

	],
	providers: [],
	selector: "app-friend-and-followers",
	templateUrl: "./friend-and-followers.component.html",
	styleUrls: ["./friend-and-followers.component.less"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendAndFollowersComponent implements OnInit {
	loading = signal<boolean>(true);
	userData = signal<FbUserDataModel>({} as FbUserDataModel);
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
	constructor(private store: Store, private indexedDb: IndexedDbService) {
	}

	async ngOnInit() {
		scrollToTop();
		await this.indexedDb.getSelectedFacebookDataStore().then((data) => {
			if(!data.facebookData){
				this.connectionsDatastore.set({} as FbConnectionsDataModel);
			}else{
				this.connectionsDatastore.set(data.facebookData.connections);
			}
		}).finally(() => {
			this.loading.set(false)
			});
		
	}
}
