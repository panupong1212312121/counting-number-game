<script>
    import { toggleGameMusic, isGameMusicPlaying } from './sound.js';
    import { onMount } from 'svelte';

    let isPlaying = isGameMusicPlaying();

    function toggleMusic() {
        toggleGameMusic();
    }

    onMount(() => {
        $: isPlaying = isGameMusicPlaying();
    });
</script>

<input type="checkbox" class="toggle toggle-lg" bind:checked={isPlaying} checked on:click={toggleMusic}/>
{#if isPlaying}
    <span>Turn-off Sound</span>
{:else}
    <span>Turn-on Sound</span>
{/if}
