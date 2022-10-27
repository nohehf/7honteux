<script lang="ts">
	import type { Question } from '../logic/Questions';
	import { createEventDispatcher } from 'svelte';

	export let question: Question;

	const dispatch = createEventDispatcher();

	const answerQuestion = (answer: number) => {
		dispatch('answer', { answer });
	};
</script>

<form>
	<p>{question.q}</p>
	{#each question.choices as choice, i}
		<button
			type="button"
			on:click={() => {
				answerQuestion(i);
			}}
		>
			{choice.text}
		</button>
	{/each}
</form>
