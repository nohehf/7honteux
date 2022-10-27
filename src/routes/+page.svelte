<script lang="ts">
	import '../app.scss';
	import { Game } from '../logic/Game';
	import GameForm from '../components/game-form.svelte';
	import logo from '../assets/logo.png';

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

<nav>
	<img src={logo} alt="7honteux" />
</nav>

<div class="wrapper">
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
</div>
<footer>7honteux®️ - v0.0.3</footer>

<style lang="scss">
	nav {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 12rem;

		img {
			height: 8rem;
		}
	}
	.wrapper {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		text-align: center;
		font-size: 0.8em;
		color: #ccc;
		padding: 1rem;
	}
</style>
