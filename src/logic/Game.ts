import { questions } from "./Questions";

export enum Categories {
	ALCOOL = 'ALCOOL',
	MORALE = 'MORALE',
	// DROGUE = 'DROGUE',
}

const categoriesArray = Object.values(Categories);

export enum QuestionType {
	YES_NO,
	NUMBER_RANGE,
	CUSTOM
}

export interface Question {
	q: string;
	type?: QuestionType;
	choices: choice[];
	condition?: (game: Game) => boolean;
}

export interface choice {
	text: string;
	score: number;
	flag?: string;
}

export type Score = { [category in Categories]: number };
export class Game {
	public score: Score;
	private questionsSets: {[category in Categories]: Question[]};
	public state: 'start' | 'playing' | 'end';
	public currentQuestion: Question | null = null;
	public currentQuestionIndex: number | null = null;
	public flags: string[];
	public currentCategory: Categories|null = null;
	public currentCategoryIndex: number|null = null;
	public questions: Question[]|null = null;

	constructor() {
		this.score = {
			[Categories.ALCOOL]: 0,
			[Categories.MORALE]: 0,
		}
		this.questionsSets = questions;
		this.state = 'start';
		this.flags = []
	}

	start() {
		console.log('Starting game');
		this.state = 'playing';
		this.currentQuestionIndex = 0;
		this.currentCategoryIndex = 0;
		this.currentCategory = categoriesArray[this.currentCategoryIndex];
		this.questions = this.questionsSets[this.currentCategory];
		this.currentQuestion = this.questions[this.currentQuestionIndex];
	}

	answerQuestion(answer: number) {
		if (this.currentQuestion === null) {
			throw new Error('No current question');
		}
		if (answer < 0 || answer >= this.currentQuestion.choices.length) {
			throw new Error('Out of range answer');
		}
		this.score[this.currentCategory!] += this.currentQuestion.choices[answer].score;
		if(this.currentQuestion.choices[answer].flag) {
			console.log('Adding flag: ' + this.currentQuestion.choices[answer].flag);
			this.flags.push(this.currentQuestion.choices[answer].flag!);
		}
		this.nextQuestion();
	}

	nextQuestion() {
		console.log('next question: ');
		console.dir(this.currentQuestion);
		if (this.currentQuestionIndex === null) {
			throw new Error('No current question');
		}
		const nextQuestionIndex = this.currentQuestionIndex + 1;
		if (nextQuestionIndex >= this.questions!.length) {
			this.nextCategory();
			return;
		}
		this.currentQuestion = this.questions![nextQuestionIndex];
		this.currentQuestionIndex = nextQuestionIndex;

		if(this.currentQuestion.condition && !this.currentQuestion.condition(this)) {
			console.log("flags: "+ this.flags);
			this.nextQuestion();
		}
	}

	nextCategory() {
		console.log('next category: ');
		if(this.currentCategoryIndex === null) {
			throw new Error('No current category');
		}
		const nextCategoryIndex = this.currentCategoryIndex + 1;
		if (nextCategoryIndex >= categoriesArray.length) {
			this.end();
			return;
		}
		this.currentCategory = categoriesArray[nextCategoryIndex];
		this.currentCategoryIndex = nextCategoryIndex;
		this.questions = this.questionsSets[this.currentCategory];
		this.currentQuestionIndex = 0;
		this.currentQuestion = this.questions![this.currentQuestionIndex];
	}


	end() {
		this.state = 'end';
	}
}
