import {
	ChangeDetectionStrategy,
	Component,
	type Signal,
	computed,
	input,
} from "@angular/core";
import type { EChartsOption } from "echarts";
import { NgxEchartsModule, provideEcharts } from "ngx-echarts";
import type { FbConnectionsDataModel } from "src/app/facebook/state/models";

/**
 * Component for displaying a chart of Facebook friends following over time
 */
@Component({
	selector: "prioss-facebook-friends-following-over-time",
	standalone: true,
	imports: [NgxEchartsModule],
	providers: [provideEcharts()],
	templateUrl: "./facebook-friends-following-over-time.component.html",
	styleUrl: "./facebook-friends-following-over-time.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacebookFriendsFollowingOverTimeComponent {
	/** Required input signal for loading state */
	loading = input.required<boolean>();

	/** Required input signal for connections data */
	connectionsData = input.required<FbConnectionsDataModel>();

	/**
	 * Computed signal for chart options
	 */
	options: Signal<EChartsOption> = computed(() => {
		const options: EChartsOption = {
			aria: {
				enabled: true,
				decal: {
					show: true,
				},
			},
			tooltip: {
				trigger: "axis",
				formatter: "{b}: {c} new Pages",
			},
			title: {
				text: "Followed Pages over Time",
				textStyle: {
					fontWeight: "normal",
				},
			},
			xAxis: {
				name: "Year",
				nameLocation: "middle",
				nameGap: 30,
				type: "category",
				data: this.getYears(),
			},
			yAxis: {
				name: "Pages",
				nameLocation: "end",
				type: "value",
				minInterval: 1,
			},
			series: [
				{
					data: this.getFollowingPerYear(),
					type: "line",
					smooth: true,
				},
			],
		};
		return options;
	});

	/**
	 * Computed function to get unique years from following data
	 * @returns An array of unique years sorted in ascending order
	 */
	getYears = computed(() => {
		const years =
			this.connectionsData()
				.followed?.following_v3.map((following) => following.timestamp)
				.map((timestamp) => new Date(timestamp * 1000).getFullYear()) ?? [];
		return Array.from(new Set(years)).sort((a, b) => a - b);
	});

	/**
	 * Computed function to get the number of followed pages per year
	 * @returns An array of numbers representing the count of followed pages for each year
	 */
	getFollowingPerYear = computed(() => {
		const followingPerYear: number[] = [];
		const years = this.getYears();
		for (const year of years) {
			followingPerYear.push(
				this.connectionsData().followed?.following_v3.filter(
					(following) => new Date(following.timestamp * 1000).getFullYear() === year
				).length ?? 0
			);
		}
		return followingPerYear;
	});
}