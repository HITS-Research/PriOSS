import {
	ChangeDetectionStrategy,
	Component,
	type Signal,
	computed,
	input,
	signal,
	OnInit,
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

/**
 * Interface for word frequency data used in the word cloud
 */
interface EchartsDatum {
	name: string;
	value: number;
}

/**
 * Enum for stop word options
 */
enum StopWordsOption {
	ENGLISH = "English Stop Words",
	GERMAN = "German Stop Words",
	CUSTOM = "Custom",
	NONE = "None",
}

/**
 * Component for generating and displaying a word cloud based on chat messages.
 * It allows customization of stop words, word length, and number of words to display.
 */
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
export class ChatWordcloudComponent implements OnInit {

	ngOnInit(): void {
		if (this.chatData().length > 0) {
			const randomChat = Math.floor(Math.random() * this.chatData().length);
			this.selectedChatID.set(this.chatData()[randomChat].id);
		}
	}

	ExcludedWordlistOption = StopWordsOption;

	/** Input property for chat data */
	chatData = input.required<ChatData[]>();

	/** Signal for the number of words to show in the word cloud */
	amountOfWordsToShow = signal<number>(50);

	/** Signal for the set of excluded words */
	excludedWords = signal<Set<string>>(new Set());

	/**
	 * Computed signal for custom excluded words list
	 */
	customExcludedWordList: Signal<Set<string>> = computed(() => {
		const customExcudeWords = this.customExcludedWordListInput().split(" ");
		const returnSet: Set<string> = new Set();
		for (const word of customExcudeWords) {
			returnSet.add(word.trim().toLowerCase());
		}
		return returnSet;
	});

	/** Signal for custom excluded words input */
	customExcludedWordListInput = signal<string>("");

	/** Signal for selected stop words options */
	stopWordsOption = signal<string[]>([StopWordsOption.CUSTOM, StopWordsOption.ENGLISH, StopWordsOption.GERMAN]);

	/** Signal for selected chat ID */
	selectedChatID = signal<string>("");

	/** Signal for selected chat participant */
	selectedChatParticipant = signal<string>("All Participants");

	/**
	 * Computed signal for selected chat participants
	 */
	selectedChatParticipants: Signal<string[]> = computed(() => {
		const participants = this.selectedChat()?.participants ?? [];

		//add All Participants at first position in array
		if (participants.length > 0) {
			participants.sort();
			participants.unshift("All Participants");
		}
		return participants ?? [];
	});

	/**
	 * Computed signal for the selected chat
	 */
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

	/** Signal for minimal word length to include in the word cloud */
	minimalWordLength = signal<number>(4);

	/**
	 * Prepares data for the word cloud
	 */
	prepareData: Signal<EchartsDatum[]> = computed(() => {
		const chat = this.selectedChat() ?? {} as ChatData;
		if (!chat.messages) {
			return [];
		}
		let words: Record<string, number> = {};
		if (chat.messages !== undefined) {
			if (this.selectedChatParticipant() === "All Participants") {
				words = this.computeTFIDF(chat.messages);
			} else {
				words = this.computeTFIDF(
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

	/**
	 * Cleans chat messages by removing stop words and applying filters
	 * @param chat - Array of chat messages to clean
	 * @returns Cleaned array of chat messages
	 */
	cleanChatMessages(chat: ChatMessage[]): ChatMessage[] {
		const messages = chat ?? [];
		let excludedWords = new Set<string>();
		const cleanChatMessages: ChatMessage[] = [];

		if (!this.stopWordsOption().includes(StopWordsOption.NONE)) {
			excludedWords = new Set([...excludedWords, ...this.getExcludedWords()]);
		}

		for (const message of messages) {
			if (message.content) {
				const messageWords = message.content.split(/(\s+|\.+)/);
				const cleanedWords = messageWords.map(word => {
					// Convert to lowercase and trim
					word = word.toLowerCase().trim();
					// Check if the word is shorter than or equal to the minimal word length
					if (word.length <= this.minimalWordLength()) {
						return "";
					}
					// Replace punctuation characters with whitespace at the end of words
					word = word.replace(/[,./\-:;?!"^]$/g, " ");
					// Check if the word contains any letters (including umlauts)
					if (!/[a-zäöüß]/i.test(word)) {
						return "";
					}
					// Check if the word is in the excluded words list
					if (excludedWords.has(word)) {
						return "";
					}
					return word;
				});

				// Filter out empty strings and join the words back together
				message.content = cleanedWords.filter(word => word !== "").join(" ");
				cleanChatMessages.push(message);
			} else {
				//do nothing if message.content is null or undefined or empty
				continue;
			}
		}

		return cleanChatMessages;
	}

	/**
	 * Calculates the frequency of words in the given array of chat messages.
	 * This is an alternative to TF-IDF for word frequency analysis.
	 * @param msgs - An array of chat messages.
	 * @returns A record containing the frequency of each word in the chat messages.
	 */
	getWordsFrequencyMap(msgs: ChatMessage[]): Record<string, number> {
		const words: Record<string, number> = {};
		const messages = this.cleanChatMessages(msgs);
		for (const message of messages) {
			const messageWords = message.content?.split(" ") ?? [];
			for (const word of messageWords) {
				words[word] = (words[word] || 0) + 1;
			}
		}

		return words;
	}

	/**
	 * Gets the set of excluded words based on selected stop word options
	 * @returns Set of excluded words
	 */
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
	 * Computes conversations from messages based on a time frame
	 * @param msgs - Array of chat messages
	 * @returns Array of conversations (each conversation is an array of messages)
	 */
	computeConversations(msgs: ChatMessage[]): ChatMessage[][] {
		if (!msgs || msgs.length === 0) return [];

		const timeframe = 30 * 60 * 1000; // 30 minutes in milliseconds as limit for conversation
		const conversations: ChatMessage[][] = [];
		let currentConversation: ChatMessage[] = [];

		for (let i = 1; i < msgs.length; i++) {
			const conversationEnded = msgs[i - 1].timestamp - msgs[i].timestamp > timeframe 
			if (conversationEnded) {
				if (currentConversation.length >= 2) {
					conversations.push(currentConversation);
				}
				currentConversation = [];
			}
			currentConversation.push(msgs[i]);
		}

		if (currentConversation.length >= 3) {
			conversations.push(currentConversation);
		}

		return conversations;
	}

	/**
	 * Computes the TF-IDF (Term Frequency-Inverse Document Frequency) scores for the given chat messages.
	 * TF-IDF is a numerical statistic that reflects the importance of a term in a document relative to a collection of documents.
	 *
	 * @param chat - The array of chat messages.
	 * @returns A record object containing the TF-IDF scores for each term in the chat messages.
	 */
	computeTFIDF(chat: ChatMessage[]): Record<string, number> {
		if (!chat || chat.length === 0) return {};

		const cleanedMessages = this.cleanChatMessages(chat);
		const termFrequencies: Record<string, number> = {};
		const documentFrequencies: Record<string, number> = {};
		const conversations = this.computeConversations(cleanedMessages);
		const totalConversations = conversations.length;

		// Compute TF and DF
		for (const convo of conversations) {
			const uniqueTerms = new Set<string>();
			for (const message of convo) {
				const terms = message.content?.toLowerCase().split(/\s+/) ?? [];
				for (const term of terms) {
					termFrequencies[term] = (termFrequencies[term] || 0) + 1;
					uniqueTerms.add(term);
				}
			}
			uniqueTerms.forEach(term => {
				documentFrequencies[term] = (documentFrequencies[term] || 0) + 1;
			});
		}

		// Compute TF-IDF
		const tfidfScores: Record<string, number> = {};
		for (const term in termFrequencies) {
			const tf = termFrequencies[term];
			const idf = Math.log(totalConversations / (documentFrequencies[term] || 1));
			tfidfScores[term] = tf * idf;
		}

		return tfidfScores;
	}

	/**
	 * Computes the ECharts options for the word cloud
	 */
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
					shape: "circle",
					left: "center",
					top: "center",
					width: "70%",
					height: "80%",
					sizeRange: [12, 60],
					rotationRange: [-90, 90],
					rotationStep: 45,
					gridSize: 8,
					drawOutOfBound: false,
					layoutAnimation: true,
					textStyle: {
						fontFamily: "sans-serif",
						fontWeight: "bold",
						color: "#5470c6",
					},
					emphasis: {
						focus: "self",
						textStyle: {
							textShadowBlur: 10,
							textShadowColor: "#333",
						},
					},
					data: this.prepareData(),
				},
			],
		};
		return options;
	});

	/** Signal for English stop words */
	stopWordsEnglish: Signal<Set<string>> = signal(new Set(stopwordsEN));

	/** Signal for German stop words */
	stopwordsGerman = signal(
		new Set(stopwordsDE),
	);
}