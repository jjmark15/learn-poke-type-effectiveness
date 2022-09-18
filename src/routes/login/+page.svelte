<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import Page from '$lib/components/Page.svelte';
	import Button from '$lib/components/Button.svelte';

	let loading = false;
	let email: string;

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signIn({ email });
			if (error) throw error;
			alert('Check your email for the login link!');
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			loading = false;
		}
	};
</script>

<Page>
	<form class="row flex flex-center">
		<div class="col-6 form-widget">
			<p class="description">Sign in via magic link with your email below</p>
			<div>
				<input
					class="inputField text-input my-2 rounded-lg"
					type="email"
					placeholder="Your email"
					bind:value={email}
				/>
			</div>
			<div>
				<Button on:click={handleLogin} disabled={loading}
					>{loading ? 'Loading' : 'Send magic link'}</Button
				>
			</div>
		</div>
	</form>
</Page>
