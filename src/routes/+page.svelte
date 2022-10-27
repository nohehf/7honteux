<script lang="ts">
	import { Game } from '../logic/Game';
	import GameForm from '../components/game-form.svelte';

	$: game = new Game();

	const handleAnswer = (event: CustomEvent) => {
		game.answerQuestion(event.detail.answer);
		game = game;
	};

	const startGame = () => {
		game.start();
		game = game;
	};
</script>

<h1>GRIFISA</h1>

{#if game.state === 'start'}
	<button on:click={startGame}>START TEST</button>
{:else if game.state === 'playing' && game.currentQuestion}
	<GameForm question={game.currentQuestion} on:answer={handleAnswer} />
{:else if game.state === 'end'}
	<p>Votre score:</p>
	{#each Object.entries(game.score) as [category, score]}
		<p>{category}: {score}</p>
	{/each}
	<p>
		Total: {Object.values(game.score).reduce((curr, next) => {
			return curr + next;
		})}
	</p>
{/if}
