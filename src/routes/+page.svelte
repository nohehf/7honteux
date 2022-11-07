<script lang="ts">
	import '../app.scss';
	import { Game } from '../logic/Game';
	import GameForm from '../components/game-form.svelte';
	import logo from '../assets/logo.png';
	import Results from '../components/results.svelte';
	import CompletionBar from '../components/completion-bar.svelte';
	import SubmitForm from '../components/submit-form.svelte';

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

	let showSubmitForm = true;
	const closeSubmitForm = () => {
		showSubmitForm = false;
	}
</script>

<nav>
	<img src={logo} alt="7honteux" />
	<a href="/help">
		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1.2em" height="1em" viewBox="0 0 1792 1504"><path fill="currentColor" d="M640 640q0-53-37.5-90.5T512 512t-90.5 37.5T384 640t37.5 90.5T512 768t90.5-37.5T640 640zm384 0q0-53-37.5-90.5T896 512t-90.5 37.5T768 640t37.5 90.5T896 768t90.5-37.5T1024 640zm384 0q0-53-37.5-90.5T1280 512t-90.5 37.5T1152 640t37.5 90.5T1280 768t90.5-37.5T1408 640zm384 0q0 174-120 321.5t-326 233t-450 85.5q-110 0-211-18q-173 173-435 229q-52 10-86 13q-12 1-22-6t-13-18q-4-15 20-37q5-5 23.5-21.5T198 1398t23.5-25.5t24-31.5t20.5-37t20-48t14.5-57.5T313 1126q-146-90-229.5-216.5T0 640q0-174 120-321.5t326-233T896 0t450 85.5t326 233T1792 640z"></path></svg>
	</a>

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
		{#if showSubmitForm}
			<SubmitForm on:close={closeSubmitForm} score={game.score} version={game.version} ></SubmitForm>
		{:else}
			<Results scores={game.score} />
		{/if}	
	{/if}
</div>
<footer>7honteux®️ - {game.version}</footer>

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

		a {
			position: absolute;
			top: 3rem;
			right: 3rem;
			color: white;
			height: 3rem;
			width: 3rem;
			background-color: #00b894;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 2rem;
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
