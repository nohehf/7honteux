<script lang="ts">
	import type { Score } from "src/logic/Game";
  import {Annee, Filiere, Sexe, submitEntry, type Player} from "../database"
	import { createEventDispatcher } from "svelte";

  export let score: Score;
  export let version: string;

  let filiere: Filiere
  let annee: Annee
  let sexe: Sexe

  const dispatch = createEventDispatcher();

  const close = () => {dispatch('close')};
  const submit = async () => {
    const player: Player = {
      filiere,
      annee,
      sexe
    }
    const result = await submitEntry(score, player, version)
    console.log(result)
    close()
  }

</script>

<form>
  {filiere}
  {annee}
  {sexe}
  <button on:click={close}>x</button>
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

  <button on:click={(e)=>{
    e.preventDefault()
    submit()
    }}>Submit</button>
</form>

<style lang="scss">
  form {
    display: flex;
  }
</style>