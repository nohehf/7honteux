export enum Categories {
	SEX = 'SEX',
	ALCOHOL = 'ALCOHOL',
	DRUG = 'DRUG'
}

export enum QuestionType {
	YES_NO,
	NUMBER_RANGE,
	CUSTOM
}

export class Question {
	q: string;
	category: Categories;
	type: QuestionType;
	choices: choice[];

	constructor(q: string, category: Categories, type: QuestionType, choices: choice[]) {
		this.q = q;
		this.category = category;
		this.type = type;
		this.choices = choices;
	}
}

export interface choice {
	text: string;
	score: number;
}

export class YesNoQuestion implements Question {
	q: string;
	category: Categories;
	type = QuestionType.YES_NO;
	choices: [{ text: 'yes'; score: number }, { text: 'no'; score: 0 | number }];

	constructor(
		q: string,
		category: Categories,
		choices: [{ text: 'yes'; score: number }, { text: 'no'; score: 0 | number }]
	) {
		this.q = q;
		this.category = category;
		this.choices = choices;
	}
}

export class NumberRangeQuestion implements Question {
	q: string;
	category: Categories;
	type = QuestionType.NUMBER_RANGE;
	choices: choice[];
	range: [number, number];

	constructor(
		q: string,
		category: Categories,
		range: [number, number],
		score: (i: number) => number,
		outOfRangeScore: number
	) {
		this.q = q;
		this.category = category;
		this.range = range;
		this.choices = new Array(range[1] - range[0]).fill(0).map((_, i) => {
			return {
				text: `${i + range[0]}`,
				score: score(i)
			};
		});
		this.choices.push({
			text: `+ de ${range[1]}`,
			score: outOfRangeScore
		});
	}
}

export const questions: Question[] = [
	new YesNoQuestion("Avez vous déjà bu de l'alcool ?", Categories.ALCOHOL, [
		{ text: 'yes', score: 1 },
		{ text: 'no', score: 0 }
	]),
	new YesNoQuestion('Avez vous déjà été ivre ?', Categories.ALCOHOL, [
		{ text: 'yes', score: 1 },
		{ text: 'no', score: 0 }
	]),
	new NumberRangeQuestion(
		'Combien de fois par semaine buvez vous ?',
		Categories.ALCOHOL,
		[0, 5],
		(i) => i,
		10
	)
];
