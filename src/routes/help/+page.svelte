<script lang="ts">
	import { submitHelp } from '../../database';
	import '../../app.scss';

	let text='';

	const submit = async () => {
		const result = await submitHelp(text);
		alert("Merci pour votre aide !");
		text = '';
	};
</script>

<div class="container">
	<form>
		<div class="entries">
			<p>
				Une question ? Une suggestion ? Un bug ? 
			</p>

			<textarea bind:value={text} cols="30" rows="10"></textarea>

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
</div>


<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	form {

    max-width: 600px;
		display: flex;
		flex-direction: column;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		border-radius: 1rem;

		p{
      color: rgb(81, 81, 81);
      font-style: italic;
    }

		input {
			height: 10rem;
		}

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
