// biome-ignore lint/style/useImportType: <explanation>
import {
	ChangeDetectionStrategy,
	Component,
	InputSignal,
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

/**
 * Component for displaying an overview of Facebook friends
 */
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
export class FacebookFriendsOverviewComponent {
	/** Input signal for loading state */
	loading = input<boolean>();

	/** Required input signal for friends data */
	friendsData: InputSignal<FbConnectionsDataModel> =
		input.required<FbConnectionsDataModel>();

	/** Signal for search value */
	searchValue = signal<string>("");

	/** Signal for visibility state */
	visible = signal<boolean>(false);

	/** Computed function to reset search */
	reset = computed(() => {
		this.searchValue.set("");
		this.search();
	});

	/** Computed function to perform search */
	search = computed(() => {
		this.visible.set(false);
		this.listOfDisplayData();
	});

	/** Computed signal for filtered display data */
	listOfDisplayData: Signal<FriendModel[]> = computed(() => {
		return this.allFriends().filter(
			(item: FriendModel) => item.name.indexOf(this.searchValue()) !== -1,
		);
	});

	/** Computed signal for user's friends */
	yourFriends: Signal<FriendItem[]> = computed(
		() => this.friendsData().yourFriends?.friends_v2 ?? [],
	);

	/** Computed signal for followed accounts */
	following: Signal<FriendItem[]> = computed(
		() => this.friendsData().followed?.following_v3 ?? [],
	);

	/** Computed signal for people you may know */
	peopleYouMayKnow: Signal<LabelValueItem> = computed(
		() => this.friendsData().peopleYouMayKnow?.label_values[0] ?? {},
	);

	/** Computed signal for rejected friend requests */
	rejectedFriendRequests: Signal<FriendItem[]> = computed(
		() => this.friendsData().rejectedFriendRequests?.rejected_requests_v2 ?? [],
	);

	/** Computed signal for sent friend requests */
	sentFriendRequests: Signal<FriendItem[]> = computed(
		() => this.friendsData().sentFriendRequests?.sent_requests_v2 ?? [],
	);

	/** Computed signal for received friend requests */
	receivedFriendRequests: Signal<FriendItem[]> = computed(
		() => this.friendsData().receivedFriendRequests?.received_requests_v2 ?? [],
	);

	/** Computed signal for all friends and connections */
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

	/** Signal for name column options */
	nameColumnOptions = signal<ColumnItem>({
		name: "Name",
		sortOrder: "ascend",
		sortFn: (a, b) => a.name.localeCompare(b.name),
		sortDirections: ["ascend", "descend", null],
	} as ColumnItem);

	/** Signal for timestamp column options */
	timestampColumnOptions = signal<ColumnItem>({
		name: "Status changed at",
		sortOrder: null,
		sortFn: (a, b) => a.timestamp - b.timestamp,
		sortDirections: ["ascend", "descend", null],
	} as ColumnItem);

	/** Signal for status column options */
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

/**
 * Interface for table column configuration
 */
interface ColumnItem {
	name: string;
	sortOrder: NzTableSortOrder | null;
	sortFn: NzTableSortFn<FriendModel> | null;
	listOfFilter: NzTableFilterList;
	filterFn: NzTableFilterFn<FriendModel> | null;
	filterMultiple: boolean;
	sortDirections: NzTableSortOrder[];
}

/**
 * Interface for friend model
 */
interface FriendModel {
	name: string;
	timestamp: number;
	status: FriendStatus;
}

/**
 * Enum for friend status
 */
enum FriendStatus {
	FRIEND = "Friend",
	FOLLOWING = "Following",
	RECEIVED = "Friend Request Received",
	REJECTED = "Friend Request Rejected",
	SENT = "Friend Request Sent",
	PERSONYOUMAYKNOW = "Person you may know",
}