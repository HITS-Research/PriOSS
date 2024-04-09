// biome-ignore lint/style/useImportType: <explanation>
import {
	ChangeDetectionStrategy,
	Component,
	InputSignal,
	OnInit,
	Signal,
	computed,
	input,
	signal,
} from "@angular/core";
import type { FbConnectionsDataModel } from "src/app/facebook/state/models";
import {
	type NzTableFilterFn,
	type NzTableFilterList,
	NzTableModule,
	type NzTableSortFn,
	type NzTableSortOrder,
} from "ng-zorro-antd/table";
import type { FriendItem } from "src/app/facebook/models/connections/FriendItem.interface";
import type { LabelValueItem } from "src/app/facebook/models/connections/PeopleYouMayKnow";
import { CommonModule } from "@angular/common";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";

@Component({
	standalone: true,
	imports: [
		NzIconModule,
		NzTableModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzDropDownModule,
		NzButtonModule,
		NzInputModule,
	],
	selector: "prioss-facebook-friends-overview",
	templateUrl: "./friends-overview.component.html",
	styleUrl: "./friends-overview.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacebookFriendsOverviewComponent implements OnInit{
	friendsData: InputSignal<FbConnectionsDataModel> =
		input.required<FbConnectionsDataModel>();

	ngOnInit() {
		console.log(this.friendsData());
	}
	searchValue = signal<string>("");
	visible = signal<boolean>(false);
	reset = computed(() => {
		this.searchValue.set("");
		this.search();
	});

	search = computed(() => {
		this.visible.set(false);
		this.listOfDisplayData();
	});

	listOfDisplayData: Signal<FriendModel[]> = computed(() => {
		return this.allFriends().filter(
			(item: FriendModel) => item.name.indexOf(this.searchValue()) !== -1,
		);
	});

	yourFriends: Signal<FriendItem[]> = computed(
		() => this.friendsData().yourFriends?.friends_v2 ?? [],
	);
	following: Signal<FriendItem[]> = computed(
		() => this.friendsData().followed?.following_v3 ?? [],
	);
	peopleYouMayKnow: Signal<LabelValueItem> = computed(
		() => this.friendsData().peopleYouMayKnow?.label_values[0] ?? {},
	);
	rejectedFriendRequests: Signal<FriendItem[]> = computed(
		() => this.friendsData().rejectedFriendRequests?.rejected_requests_v2 ?? [],
	);
	sentFriendRequests: Signal<FriendItem[]> = computed(
		() => this.friendsData().sentFriendRequests?.sent_requests_v2 ?? [],
	);
	receivedFriendRequests: Signal<FriendItem[]> = computed(
		() => this.friendsData().receivedFriendRequests?.received_requests_v2 ?? [],
	);

	allFriends: Signal<FriendModel[]> = computed(() => {
		const friends: FriendModel[] = [];

		for (const friend of this.yourFriends()) {
			friends.push({
				name: friend.name,
				timestamp: friend.timestamp*1000,
				status: FriendStatus.FRIEND,
			});
		}
		for (const friend of this.following()) {
			friends.push({
				name: friend.name,
				timestamp: friend.timestamp*1000,
				status: FriendStatus.FOLLOWING,
			});
		}
		for (const friend of this.rejectedFriendRequests()) {
			friends.push({
				name: friend.name,
				timestamp: friend.timestamp*1000,
				status: FriendStatus.REJECTED,
			});
		}
		for (const friend of this.sentFriendRequests()) {
			friends.push({
				name: friend.name,
				timestamp: friend.timestamp*1000,
				status: FriendStatus.SENT,
			});
		}
		for (const friend of this.receivedFriendRequests()) {
			friends.push({
				name: friend.name,
				timestamp: friend.timestamp*1000,
				status: FriendStatus.RECEIVED,
			});
		}
		for (const person of this.peopleYouMayKnow().vec ?? []) {
			friends.push({
				name: person.value,
				timestamp: 0,
				status: FriendStatus.PERSONYOUMAYKNOW,
			});
		}
		return friends;
	});

	nameColumnOptions = signal<ColumnItem>({
		name: "Name",
		sortOrder: "ascend",
		sortFn: (a, b) => a.name.localeCompare(b.name),
		sortDirections: ["ascend", "descend", null],
	} as ColumnItem);

	timestampColumnOptions = signal<ColumnItem>({
		name: "Status changed at",
		sortOrder: null,
		sortFn: (a, b) => a.timestamp - b.timestamp,
		sortDirections: ["ascend", "descend", null],
	} as ColumnItem);

	statusColumnOptions = signal<ColumnItem>({
		name: "Status",
		sortOrder: null,
		sortFn: (a, b) => a.status.localeCompare(b.status),
		listOfFilter: [
			{ text: "Friend", value: FriendStatus.FRIEND },
			{ text: "Following", value: FriendStatus.FOLLOWING },
			{ text: "Friend Request Received", value: FriendStatus.RECEIVED },
			{ text: "Friend Request Rejected", value: FriendStatus.REJECTED },
			{ text: "Friend Request Sent", value: FriendStatus.SENT },
			{ text: "Person you may know", value: FriendStatus.PERSONYOUMAYKNOW },
		],
		filterFn: (list: string[], item: FriendModel) =>
			list.some((status) => item.status.toString() === status),
		filterMultiple: true,
		sortDirections: ["ascend", "descend", null],
	} as ColumnItem);
}

interface ColumnItem {
	name: string;
	sortOrder: NzTableSortOrder | null;
	sortFn: NzTableSortFn<FriendModel> | null;
	listOfFilter: NzTableFilterList;
	filterFn: NzTableFilterFn<FriendModel> | null;
	filterMultiple: boolean;
	sortDirections: NzTableSortOrder[];
}

interface FriendModel {
	name: string;
	timestamp: number;
	status: FriendStatus;
}

enum FriendStatus {
	FRIEND = "Friend",
	FOLLOWING = "Following",
	RECEIVED = "Friend Request Received",
	REJECTED = "Friend Request Rejected",
	SENT = "Friend Request Sent",
	PERSONYOUMAYKNOW = "Person you may know",
}
