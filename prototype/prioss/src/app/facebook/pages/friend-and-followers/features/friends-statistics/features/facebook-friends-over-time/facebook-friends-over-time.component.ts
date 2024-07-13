import { ChangeDetectionStrategy, Component, type Signal, computed, input } from '@angular/core';
import type { EChartsOption } from 'echarts';
import { NgxEchartsModule, provideEcharts } from 'ngx-echarts';
import type { FbConnectionsDataModel } from 'src/app/facebook/state/models';

@Component({
    selector: 'prioss-facebook-friends-over-time',
    standalone: true,
    imports: [NgxEchartsModule],
    providers: [provideEcharts()],
    templateUrl: './facebook-friends-over-time.component.html',
    styleUrl: './facebook-friends-over-time.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookFriendsOverTimeComponent {
    connectionsData = input.required<FbConnectionsDataModel>();
    options: Signal<EChartsOption> = computed(() => {
        const options: EChartsOption = {
            aria: {
                enabled: true,
                decal: {
                    show: true,
                },
            },
            legend: {
                data: ["Liked"]
            },
            tooltip: {
                trigger: "axis",
                formatter: "{b}: {c} new Friends",
            },
            title: {
                text: "Friends added over Time",
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
                name: "Friends",
                nameLocation: "end",
                type: "value",
                minInterval: 1,
            },
            series: [
                {
                    data: this.getFriendsPerYear(),
                    type: "line",
                    smooth: true,
                },
            ],
        };
        return options;
    });

    getYears = computed(() => {
        const years =
            this.connectionsData()
                .yourFriends?.friends_v2.map((friend) => friend.timestamp)
                .map((timestamp) => new Date(timestamp * 1000).getFullYear()) ?? [];
        return Array.from(new Set(years)).sort((a, b) => a - b);
    });
    getFriendsPerYear = computed(() => {
        const friendsPerYear: number[] = [];
        const years = this.getYears();
        for (const year of years) {
            friendsPerYear.push(
                this.connectionsData().yourFriends?.friends_v2.filter(
                    (friend) => new Date(friend.timestamp * 1000).getFullYear() === year
                ).length ?? 0
            );
        }
        return friendsPerYear;
    });
}
