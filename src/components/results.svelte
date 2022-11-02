<script lang="ts">
	import type { Score } from 'src/logic/Game';

	export let scores: Score;
</script>

<h1>Résultats:</h1>
<div class="results">
	{#each Object.entries(scores) as [category, score]}
		<div class="result">
			<p>{category}: {score}pts |</p>
		</div>
	{/each}
	<div class="result">
		<p>
			Total: {Object.values(scores).reduce((curr, next) => {
				return curr + next;
			})}pts |
		</p>
	</div>
</div>
