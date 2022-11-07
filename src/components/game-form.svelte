<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Question } from 'src/logic/Game';

	export let question: Question;

	const dispatch = createEventDispatcher();

	const answerQuestion = (answer: number) => {
		dispatch('answer', { answer });
	};
</script>

<form>
	<h3 class="question">{question.q}</h3>
	<div class="answers">
		{#each question.choices as choice, i}
			<button
				type="button"
				on:click={() => {
					answerQuestion(i);
				}}
				class={i === 0 ? 'green' : 'red'}
			>
				{choice.text}
			</button>
		{/each}
	</div>
</form>

<style lang="scss">
	form {
		padding: 2rem;
		border-radius: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		width: 70%;
		min-width: 400px;
		max-width: 600px;
		min-height: 40%;
	}
	.answers {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		flex-wrap: wrap;

		&::after {
			content: '';
			flex: auto;
		}
	}
</style>
