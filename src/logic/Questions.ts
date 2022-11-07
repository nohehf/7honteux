import type { Game, Question } from "./Game"
import type { Categories } from "./Game"

export const needFlagsCondition = (flags: string[]) => {
	if(flags.length === 0) {
		return (_:Game)=>true
	}
	return (game: Game) => {return flags.every(flag => {return game.flags.includes(flag)})}
}

export const AlcoolQuestions: Question[] = [
	{
		q: "Avez-vous déjà goûté à l'alcool ?",
		choices: [
			{"text": "oui", "score": 1, flag: "goute_alcool"},
			{"text": "non", "score": 0},
		],
	},
	{
		q: "Avez-vous déjà bu de l'alcool ?",
		choices: [
			{"text": "oui", "score": 1, flag: "bu_alcool"},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["goute_alcool"]),
	},
	{
		q: "Avez-vous déjà été ivre ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Avez-vous déjà participé à des jeux à boire ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Avez-vous déjà bu assez pour vomir ? (À cause de l'alcool)",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Avez-vous déjà vomi sur vous ou sur quelqu'un d'autre ? (À cause de l'alcool)",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Vous êtes vous déjà fait sortir de force d'un bar ou d'une boîte de nuit ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Avez-vous déjà participé à un barathon ? (Tous les bars d'une ville ou d'une rue)",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Avez-vous déjà bu de l'alcool pour le petit-déjeuner ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Combien de fois buvez-vous de l'alcool par semaine ? (en moyenne)",
		choices: [
			{"text": "moins d'une fois", "score": 0},
			{"text": "1", "score": 1},
			{"text": "2", "score": 2},
			{"text": "3", "score": 3},
			{"text": "4", "score": 4},
			{"text": "5", "score": 5},
			{"text": "6", "score": 6},
			{"text": "7", "score": 7},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Avez-vous déjà dormi dans des toilettes ? (À cause de l'alcool)",
		choices: [
			{"text": "oui", "score": 1, flag: "dormi_toilettes_alcool"},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Dans une boîte de nuit ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool", "dormi_toilettes_alcool"]),
	},
	{
		q: "Avez-vous vous-même été volontairement à cet endroit pour dormir ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool", "dormi_toilettes_alcool"]),
	},
	{
		q: "Vous-êtes vous déjà endormi(e) ou évanoui(e) dans un bar ou une boîte ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Avez-vous déjà chuté ? (À cause de l'alcool)",
		choices: [
			{"text": "oui", "score": 1, flag: "chute_alcool"},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Plusieurs fois ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool", "chute_alcool"]),
	},
	{
		q: "Une ou plusieurs personnes ont-elles dû intervenir pour vous relever ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool","chute_alcool"]),
	},
	{
		q: "Avez-vous déjà conduit une voiture (ou moto) en étant ivre ?",
		choices: [
			{"text": "oui", "score": 1, flag: "conduit_alcool"},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "En respectant le code de la route ?",
		choices: [
			{"text": "oui", "score": 0},
			{"text": "non", "score": 1},
		],
		condition: needFlagsCondition(["conduit_alcool","bu_alcool"]),
	},
	{
		q: "Sans accident ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["conduit_alcool","bu_alcool"]),
	},
	{
		q: "Avez-vous déjà pris un vélo en étant ivre ?",
		choices: [
			{"text": "oui", "score": 1, flag: "velo_alcool"},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["bu_alcool"]),
	},
	{
		q: "Êtes-vous tombé(e) ?",
		choices: [
			{"text": "oui", "score": 1},
			{"text": "non", "score": 0},
		],
		condition: needFlagsCondition(["velo_alcool","bu_alcool"]),
	},
	{
    q: "Avez-vous déjà avalé votre vomi ou celui de quelqu'un d'autre ? (À cause de l'alcool)",
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ],
		condition: needFlagsCondition(["bu_alcool"]),
  },
  {
    q: 'Avez-vous déjà vomi dans un lieu public ?',
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ],
		condition: needFlagsCondition(["bu_alcool"]),
  },
  {
    q: 'Avez-vous déjà été en cours ivre ?',
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ],
		condition: needFlagsCondition(["bu_alcool"]),
  },
  {
    q: 'Avez-vous déjà été en partiel/exam ivre ?',
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ],
		condition: needFlagsCondition(["bu_alcool"]),
  }
]

export const MoraleQuestions: Question[] = [
  {
    q: "Avez-vous déjà ri du malheur de quelqu'un ?",
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ]
  },
  {
    q: "Avez-vous déjà ri d'une personne mentalement ou physiquement handicapée ? (Sans connaître la personne)",
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ]
  },
  {
    q: "Avez-vous déjà posé un lapin à quelqu'un ? (Rendez-vous amical, amoureux ou quelconque)",
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ]
  },
  {
    q: "Avez-vous déjà jugé quelqu'un pour son apparence ?",
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ]
  },
  {
    q: "Avez-vous déjà changé de trottoir à cause de l'apparence de quelqu'un ?",
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ]
  },
  {
    q: 'Avez-vous déjà ignoré un sans-abri ?',
    choices: [ { text: 'oui', score: 1 }, { text: 'non', score: 0 } ]
  }
]


export const questions: { [category in Categories]: Question[] } = {
	["ALCOOL"]: AlcoolQuestions,
	["MORALE"]: MoraleQuestions,
}
