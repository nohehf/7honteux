<script lang="ts">
	import '../app.scss';
	import { Game } from '../logic/Game';
	import GameForm from '../components/game-form.svelte';
	import logo from '../assets/logo.png';
	import Results from '../components/results.svelte';
	import CompletionBar from '../components/completion-bar.svelte';

	$: game = new Game();

	const handleAnswer = (event: CustomEvent) => {
		game.answerQuestion(event.detail.answer);
		game = game;
	};

	const startGame = () => {	
		game.start();
		game = game;
	};

	let completion = 0;
	$: {
		if(game.state === 'playing') {
			completion = game.getCategoryCompletion()
		}
		game = game
	}
</script>

<nav>
	<img src={logo} alt="7honteux" />
</nav>

<div class="wrapper">
	{#if game.state === 'start'}
		<button on:click={startGame}>START TEST</button>
	{:else if game.state === 'playing' && game.currentQuestion}
		<h2 class="currentCategory">{game.currentCategory}</h2>
		<GameForm question={game.currentQuestion} on:answer={handleAnswer} />
		<div class="completionBar">
			<CompletionBar {completion} ></CompletionBar>
		</div>
	{:else if game.state === 'end'}
		<Results scores={game.score} />
	{/if}
</div>
<footer>7honteux®️ - v0.0.4</footer>

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
		padding: 5rem 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.completionBar {
			padding: 3rem 5rem;
			width: 100%;
		}
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
