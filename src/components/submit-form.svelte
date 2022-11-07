<script lang="ts">
	import type { Score } from 'src/logic/Game';
	import { Annee, Filiere, Sexe, submitEntry, type Player } from '../database';
	import { createEventDispatcher } from 'svelte';

	export let score: Score;
	export let version: string;

	let filiere: Filiere;
	let annee: Annee;
	let sexe: Sexe;

	const dispatch = createEventDispatcher();

	const close = () => {
		dispatch('close');
	};
	const submit = async () => {
		const player: Player = {
			filiere,
			annee,
			sexe
		};
		const result = await submitEntry(score, player, version);
		console.log(result);
		close();
	};
</script>

<form>
	<div class="closeContainer">
		<button class="close red" on:click={close}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="0.93em"
				height="1em"
				viewBox="0 0 1216 1312"
				><path
					fill="currentColor"
					d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68z"
				/></svg
			>
		</button>
	</div>
	<div class="entries">
    <p>
      Afin de proposer des super stats, vous pouvez envoyer vos resultats sur notre serveur.
      Aucune information autre que celle-ci n'est stockée.
      Merci de ne pas fausser les résultats.
    </p>
		<select bind:value={filiere}>
			{#each Object.entries(Filiere) as [val, name]}
				<option value={val}>
					{name}
				</option>
			{/each}
		</select>

		<select bind:value={annee}>
			{#each Object.entries(Annee) as [val, name]}
				<option value={val}>
					{name}
				</option>
			{/each}
		</select>

		<select bind:value={sexe}>
			{#each Object.entries(Sexe) as [val, name]}
				<option value={val}>
					{name}
				</option>
			{/each}
		</select>

		<button
			class="green"
			on:click={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="1em"
				height="1em"
				viewBox="0 0 1792 1792"
				><path
					fill="currentColor"
					d="M1764 11q33 24 27 64l-256 1536q-5 29-32 45q-14 8-31 8q-11 0-24-5l-453-185l-242 295q-18 23-49 23q-13 0-22-4q-19-7-30.5-23.5T640 1728v-349l864-1059l-1069 925l-395-162q-37-14-40-55q-2-40 32-59L1696 9q15-9 32-9q20 0 36 11z"
				/></svg
			>
		</button>
	</div>
</form>

<style lang="scss">
	form {
    p{
      color: rgb(81, 81, 81);
      font-style: italic;
    }
    max-width: 600px;
		display: flex;
		flex-direction: column;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		border-radius: 1rem;

		.entries {
			display: flex;
			flex-direction: column;
			padding: 2rem;
			gap: 1rem;
		}

		.closeContainer {
			margin-bottom: -2rem;
			display: flex;
			justify-content: flex-end;

			.close {
				width: 2rem;
				height: 2rem;
				padding: 0;
				position: relative;
				top: -1rem;
				right: -1rem;
			}
		}
	}
</style>
