import { Question, questions, type Categories } from './Questions';

export type Score = { [category in Categories]: number };
export class Game {
	public score: Score;
	private questions: Question[];
	public state: 'start' | 'playing' | 'end';
	public currentQuestion: Question | null = null;
	public currentQuestionIndex: number | null = null;

	constructor() {
		this.score = {
			ALCOHOL: 0,
			DRUG: 0,
			SEX: 0
		};
		this.questions = questions;
		this.state = 'start';
	}

	start() {
		console.log('Starting game');
		this.state = 'playing';
		this.currentQuestion = this.questions[0];
		this.currentQuestionIndex = 0;
	}

	answerQuestion(answer: number) {
		if (this.currentQuestion === null) {
			throw new Error('No current question');
		}
		if (answer < 0 || answer >= this.currentQuestion.choices.length) {
			throw new Error('Out of range answer');
		}
		this.score[this.currentQuestion.category] += this.currentQuestion.choices[answer].score;
		this.nextQuestion();
	}

	nextQuestion() {
		console.log('next question: ');
		console.dir(this.currentQuestion);
		if (this.currentQuestionIndex === null) {
			throw new Error('No current question');
		}
		const nextQuestionIndex = this.currentQuestionIndex + 1;
		if (nextQuestionIndex >= this.questions.length) {
			this.end();
			return;
		}
		this.currentQuestion = this.questions[nextQuestionIndex];
		this.currentQuestionIndex = nextQuestionIndex;
	}

	end() {
		this.state = 'end';
	}
}
