import {
	ChangeDetectionStrategy,
	Component,
	type Signal,
	computed,
	input,
	signal,
} from "@angular/core";
import { NgxEchartsModule, provideEcharts } from "ngx-echarts";
import "echarts-wordcloud";
import { stopwordsEN, stopwordsDE } from "./stopwords";
import type { ChatData, ChatMessage } from "../../../chatdata.type";
import { FormsModule } from "@angular/forms";
import type { EChartsOption } from "echarts";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { CommonModule } from "@angular/common";
import { NzInputModule } from "ng-zorro-antd/input";
interface EchartsDatum {
	name: string;
	value: number;
}
enum StopWordsOption {
	ENGLISH = "English Stop Words",
	GERMAN = "German Stop Words",
	CUSTOM = "Custom",
	NONE = "None",
}

@Component({
	selector: "prioss-chat-wordcloud",
	standalone: true,
	imports: [
		CommonModule,
		NgxEchartsModule,
		FormsModule,
		NzFormModule,
		NzInputNumberModule,
		NzInputModule,
		NzSelectModule,
	],
	providers: [provideEcharts()],
	templateUrl: "./chat-wordcloud.component.html",
	styleUrl: "./chat-wordcloud.component.less",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWordcloudComponent {
	ExcludedWordlistOption = StopWordsOption;


	chatData = input.required<ChatData[]>();
	amountOfWordsToShow = signal<number>(50);
	excludedWords = signal<Set<string>>(new Set());
	customExcludedWordList: Signal<Set<string>> = computed(() => {
		const customExcudeWords = this.customExcludedWordListInput().split(" ");
		const returnSet: Set<string> = new Set();
		for (const word of customExcudeWords) {
			returnSet.add(word.trim().toLowerCase());
		}
		return returnSet;
	});

	customExcludedWordListInput = signal<string>("");
	stopWordsOption = signal<string[]>([StopWordsOption.CUSTOM, StopWordsOption.ENGLISH, StopWordsOption.GERMAN]);
	selectedChatID = signal<string>("");
	selectedChatParticipant = signal<string>("All Participants");

	selectedChatParticipants: Signal<string[]> = computed(() => {
		const participants = this.selectedChat()?.participants ?? [];

		//add All Participants at first position in array
		if (participants.length > 0) {
			participants.sort();
			participants.unshift("All Participants");
		}
		return participants ?? [];
	});

	selectedChat: Signal<ChatData> = computed(() => {
		const chat = this.chatData().find(
			(chat) => chat.id === this.selectedChatID(),
		);
		if (!chat) {
			return {} as ChatData;
		}
		return (
			this.chatData().find((chat) => chat.id === this.selectedChatID()) ??
			({} as ChatData)
		);
	});

	minimalWordLength = signal<number>(4);

	prepareData: Signal<EchartsDatum[]> = computed(() => {
		const chat = this.selectedChat() ?? {} as ChatData;
		if (!chat.messages) {
			return [];
		}
		let words: Record<string, number> = {};
		if (chat.messages !== undefined) {
			if (this.selectedChatParticipant() === "All Participants") {
				words = this.getWordsFrequencyMap(chat.messages);
			} else {
				words = this.getWordsFrequencyMap(
					chat.messages.filter(
						(message) => message.sender === this.selectedChatParticipant(),
					),
				);
			}
		}
		return Object.entries(words).map(([word, count]) => ({
			name: word,
			value: count,
		})).slice(0, this.amountOfWordsToShow());
	});

	cleanChatMessages(chat: ChatMessage[]): ChatMessage[] {
		const messages = chat ?? [];
		let excludedWords = new Set();
		const cleanChatMessages: ChatMessage[] = [];
		if (!this.stopWordsOption().includes(StopWordsOption.NONE)) {
			excludedWords = new Set([...excludedWords, ...this.getExcludedWords()]);
		}
		for (const message of messages) {
			const messageWords = message.content?.split(" ") ?? [];

			for (const word of messageWords) {
				let lCaseword = word.trim().toLowerCase();
				// remove punctuation at the end of words
				lCaseword = lCaseword.replace(/[,.:;?!]+$/g, "");
				if(/[0-9]+/.test(lCaseword)) {
					continue;
				}
				if (excludedWords.has(lCaseword)) {
					continue;
				}
				if (lCaseword.length >= this.minimalWordLength()) {
					cleanChatMessages.push(message);
				}
				
			}
		}
		return cleanChatMessages;
	}


	getWordsFrequencyMap(msgs: ChatMessage[]): Record<string, number> {
		const words: Record<string, number> = {};
		const messages = msgs;
		let excludedWords = new Set();
		console.log("excluded Wordlist Options", this.stopWordsOption())
		if (!this.stopWordsOption().includes(StopWordsOption.NONE)) {
			excludedWords = new Set([...excludedWords, ...this.getExcludedWords()]);
			console.log("excluded words", excludedWords)
		}
		for (const message of messages) {
			const messageWords = message.content?.split(" ") ?? [];

			for (const word of messageWords) {
				let lCaseword = word.trim().toLowerCase();
				// remove punctuation at the end of words
				lCaseword = lCaseword.replace(/[,.:;?!]+$/g, "");
				if (excludedWords.has(lCaseword)) {
					continue;
				}
				if (lCaseword.length >= this.minimalWordLength()) {
					const count = words[lCaseword] || 0;
					words[lCaseword] = count + 1;
				}
			}
		}
		
		return words;
	}
	getExcludedWords(): Set<string> {
		let excludedWords = new Set<string>();
		if (!this.stopWordsOption().includes(StopWordsOption.NONE.toString())) {

			for (const option of this.stopWordsOption()) {
				if (option === StopWordsOption.ENGLISH.toString()) {
					excludedWords = new Set([
						...excludedWords,
						...this.stopWordsEnglish(),
					]);
				}
				if (option === StopWordsOption.GERMAN.toString()) {
					excludedWords = new Set([
						...excludedWords,
						...this.stopwordsGerman(),
					]);
				}
				if (option === StopWordsOption.CUSTOM.toString()) {
					excludedWords = new Set([
						...excludedWords,
						...this.customExcludedWordList(),
					]);
				}
			}
		}
		return excludedWords;
	}

	/**
	 * this function returns conversations of a chat. a conversation is a list of messages in a particular timeframe.
	 * The timeframe can be specified
	 */
	computeConversations(msgs: ChatMessage[]): ChatMessage[][] {
		if (!msgs) {
			return [];
		}
		const timeframe = this.computeTimeframeForConversation(msgs);
		const messages = msgs;
		const conversations: ChatMessage[][] = [];
		let currentConversation: ChatMessage[] = [];
		for (let i = 0; i < messages.length - 1; i++) {
			const message = messages[i];
			const nextMessage = messages[i + 1];
			if ((message.timestamp - nextMessage.timestamp) > timeframe) {
				conversations.push(currentConversation);
				currentConversation = [];
			}
			currentConversation.push(message);
		}
		return conversations;
	}

	/**
	 * This function calculates the timeframe in milliseconds, where the conversation is active.
	 * the conversation is active, if a message is answered in a timeframe, in which 95% of all messages were answered.
	 */
	computeTimeframeForConversation(msgs: ChatMessage[]): number {
		const responseTimes: number[] = [];
		if (!msgs) {
			return 0;
		}
		for (let i = 0; i < msgs.length - 1; i++) {
			const message = msgs[i];
			const nextMessage = msgs[i + 1];
			responseTimes.push(message.timestamp - nextMessage.timestamp);
		}
		responseTimes.sort();
		const index = Math.floor(responseTimes.length * 0.95);
		return responseTimes[index];
	}

	// Function to compute TF-IDF scores
	computeTFIDF(chat: ChatMessage[]): Record<string, number> {
		if(!chat) {
			return {};
		}
		const cleanedMessages = this.cleanChatMessages(chat);
		const termFrequencies: Record<string, number> = {};
		const documentFrequencies: Record<string, number> = {};
		const totalMessages = cleanedMessages.length;
		const conversations = this.computeConversations(cleanedMessages);
		// Step 1: Compute term frequencies (TF) for each term in the chat
		for (const message of cleanedMessages) {
			const terms = message.content?.toLowerCase().split(/\s+/)??[];
			
			for (const term of terms) {
				termFrequencies[term] = (termFrequencies[term] || 0) + 1;
			}
		}


		// Step 2: Compute inverse document frequency (IDF) for each term
		for (const convo of conversations) {
			const uniqueTerms = new Set<string>();
			for (const message of convo) {
				const terms = message.content?.toLowerCase().split(/\s+/)??[];
				for (const term of terms) {
					uniqueTerms.add(term);
				}
			}
			
			for (const term of uniqueTerms) {
				documentFrequencies[term] = (documentFrequencies[term] || 0) + 1;
			}
		}

		// Step 3: Compute TF-IDF scores
		const tfidfScores: Record<string, number> = {};
		for (const term in termFrequencies) {
			const tf = termFrequencies[term];
			const idf = Math.log(totalMessages / (1 + (documentFrequencies[term] || 0)));
			tfidfScores[term] = tf * idf;
		}
		return tfidfScores;
	}

	options: Signal<EChartsOption> = computed(() => {
		const options: EChartsOption = {
			toolbox: {
				show: true,
				feature: {
					saveAsImage: {
						show: true,
						title: "Save as Image",
						name: "Word Cloud",
						type: "png",
						pixelRatio: 2,
					},
				},
			},
			tooltip: {
				show: true,
				trigger: "item",
				formatter: "{b}: {c}",
			},
			series: [
				{
					type: "wordCloud",

					// The shape of the "cloud" to draw. Can be any polar equation represented as a
					// callback function, or a keyword present. Available presents are circle (default),
					// cardioid (apple or heart shape curve, the most known polar equation), diamond (
					// alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

					shape: "circle",

					// A silhouette image which the white area will be excluded from drawing texts.
					// The shape option will continue to apply as the shape of the cloud to grow.

					// Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
					// Default to be put in the center and has 75% x 80% size.

					left: "center",
					top: "center",
					width: "70%",
					height: "80%",

					// Text size range which the value in data will be mapped to.
					// Default to have minimum 12px and maximum 60px size.

					sizeRange: [12, 60],

					// Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

					rotationRange: [-90, 90],
					rotationStep: 45,

					// size of the grid in pixels for marking the availability of the canvas
					// the larger the grid size, the bigger the gap between words.

					gridSize: 8,

					// set to true to allow word being draw partly outside of the canvas.
					// Allow word bigger than the size of the canvas to be drawn
					drawOutOfBound: false,

					// if the font size is too large for the text to be displayed,
					// whether to shrink the text. If it is set to false, the text will
					// not be rendered. If it is set to true, the text will be shrinked.

					// If perform layout animation.
					// NOTE disable it will lead to UI blocking when there is lots of words.
					layoutAnimation: true,

					// Global text style
					textStyle: {
						fontFamily: "sans-serif",
						fontWeight: "bold",
						// Color can be a callback function or a color string
						color: "red",
					},
					emphasis: {
						focus: "self",

						textStyle: {
							textShadowBlur: 10,
							textShadowColor: "#333",
						},
					},

					// Data is an array. Each array item must have name and value property.
					data: this.prepareData(),
				},
			],
		};
		return options;
	});
	stopWordsEnglish: Signal<Set<string>> = signal(new Set(stopwordsEN));
	stopwordsGerman = signal(
		new Set(stopwordsDE),
	);
}
