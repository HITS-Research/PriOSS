import {AfterViewInit, Component, Input, OnInit, ChangeDetectionStrategy, computed, Signal} from '@angular/core';
import {SequenceComponentInit} from '../../../features/utils/sequence-component-init.abstract';
import {InstaLikedCommentsInfo} from 'src/app/instagram/models/LikedCommentsAndPostsInfo/InstaLikedCommentsInfo';
import {InstaLikedPostsInfo} from 'src/app/instagram/models/LikedCommentsAndPostsInfo/InstaLikedPostsInfo';
import {Store} from "@ngxs/store";
import {InstaState} from "../../state/insta.state";
import {EChartsOption} from "echarts";
import {DataRangeCalculatorService} from "../../service/echarts/data-range-calculator.service";
import {InstaUserPostsDataModel, InstaUserStoriesDataModel} from "../../state/models";
import InstaUserCommentsDataModel from "../../state/models/insta-user-comments-data.interface";

@Component({
    selector: 'app-insta-liked-content',
    templateUrl: './insta-liked-content.component.html',
    styleUrls: ['./insta-liked-content.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InstaLikedContentComponent extends SequenceComponentInit implements AfterViewInit, OnInit {

    @Input()
    previewMode = false;
    profilePic: string = "";
    switchValue = true;
    liked_comments: InstaLikedCommentsInfo[] = [];
    liked_posts: InstaLikedPostsInfo[] = [];
    visible = false;
    likedCommentsSearchValue = '';
    likedPostsSearchValue = '';
    listOfLikedComments: InstaLikedCommentsInfo[] = [];
    listOfLikedPosts: InstaLikedPostsInfo[] = [];
    postAndStories: (InstaUserPostsDataModel | InstaUserStoriesDataModel)[] = [];
    filteredPostAndStories: (InstaUserPostsDataModel | InstaUserStoriesDataModel)[] = [];
    comments : InstaUserCommentsDataModel[];
    userName:string;

    sortLikedCommentsDate = (a: InstaLikedCommentsInfo, b: InstaLikedCommentsInfo): number => +a.timestamp - +b.timestamp;
    sortLikedPostsDate = (a: InstaLikedPostsInfo, b: InstaLikedPostsInfo): number => +a.timestamp - +b.timestamp;

    constructor(private store: Store, private rangeCalculator: DataRangeCalculatorService) {
        super();
    }

    ngOnInit() {
        const {likedCommentsInfo, likedPostsInfo, posts, stories, comments} = this.store.selectSnapshot(InstaState.getUserInteractions);
        this.liked_comments = likedCommentsInfo;
        this.listOfLikedComments = [...likedCommentsInfo]
        this.liked_posts = likedPostsInfo;
        this.listOfLikedPosts = [...likedPostsInfo]
        this.profilePic = this.store.selectSnapshot(InstaState.getProfilePic);
        this.userName = this.store.selectSnapshot(InstaState.getUserPersonalData).personalInfo.name;
        this.comments = this.sortComments([...comments]);
        this.constructPostAndStories(posts,stories);
    }

    ngAfterViewInit() {
        if (!this.previewMode) {
            this.initComponent();
        }
    }

    override async initComponent(): Promise<void> {
        this.filterPostedContent(true);
    }

    reset(searchList: string): void {
        switch (searchList) {
            case 'likedComments':
                this.likedCommentsSearchValue = '';
                break;
            case 'likedPosts':
                this.likedPostsSearchValue = '';
                break;
            default:
                break;
        }

        this.search(searchList);
    }

    search(searchList: string): void {
        this.visible = false;

        switch (searchList) {
            case 'likedComments':
                this.listOfLikedComments = this.liked_comments.filter((item: InstaLikedCommentsInfo) => item.user.toLowerCase().indexOf(this.likedCommentsSearchValue.toLowerCase()) !== -1);
                break;
            case 'likedPosts':
                this.listOfLikedPosts = this.liked_posts.filter((item: InstaLikedPostsInfo) => item.user.toLowerCase().indexOf(this.likedPostsSearchValue.toLowerCase()) !== -1);
                break;
            default:
                break;
        }
    }

    options: Signal<EChartsOption> = computed(() => {
        const dateRange = this.rangeCalculator.getDateRangeArray(this.timestampArray([...this.liked_posts, ...this.liked_comments]));
        const options: EChartsOption = {
            aria: {
                enabled: true,
                decal: {
                    show: true,
                },
            },
            grid: {
                top: 70,
                bottom: 50
            },
            tooltip: {
                trigger: "axis",
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            legend: {
                data: ["Liked Posts", "Liked Comments"]
            },
            xAxis: {
                type: "category",
                data: dateRange,
            },
            yAxis: {
                type: "value",
                minInterval: 1,
            },
            series: [
                {
                    name: "Liked Posts",
                    data: this.rangeCalculator.countOccurrencesInRange(dateRange, this.timestampArray(this.liked_posts)),
                    type: "line",
                    smooth: true,
                },
                {
                    name: "Liked Comments",
                    data: this.rangeCalculator.countOccurrencesInRange(dateRange, this.timestampArray(this.liked_comments)),
                    type: "line",
                    smooth: true,
                },
            ],
        };
        return options;
    });

    private timestampArray(data: (InstaLikedPostsInfo | InstaLikedCommentsInfo)[]): (string | number)[] {
        return data.map(item => item.timestamp);
    }

    isStory(obj: InstaUserStoriesDataModel | InstaUserPostsDataModel): boolean {
        return (typeof obj.media).toString() === "string";
    }

    filterPostedContent(event: boolean) {
        if (event) {
            this.filteredPostAndStories = this.postAndStories.filter(pandS => pandS.title.length > 0);
        } else {
            this.filteredPostAndStories = [...this.postAndStories];
        }
    }

    constructPostAndStories(posts: InstaUserPostsDataModel[], stories: InstaUserStoriesDataModel[]) {
        const postAndStories: (InstaUserPostsDataModel | InstaUserStoriesDataModel)[] = [...posts, ...stories];
        postAndStories.sort((a, b) => {
            const dateA = new Date(a.timestamp * 1000).getTime();
            const dateB = new Date(b.timestamp * 1000).getTime();
            return dateB - dateA;
        });
        this.postAndStories = postAndStories;
    }

    sortComments(comments : InstaUserCommentsDataModel[]): InstaUserCommentsDataModel[] {
        comments.sort((a, b) => {
            const dateA = new Date(a.timestamp * 1000).getTime();
            const dateB = new Date(b.timestamp * 1000).getTime();
            return dateB - dateA;
        });
       return comments;
    }

    getRandomSoftColor() {
        const hue = Math.floor(Math.random() * 360);
        const lightness = Math.floor(Math.random() * 20) + 70;
        const saturation = Math.floor(Math.random() * 21) + 40;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
}
