<script>
    import { navigate } from 'svelte-routing';
    import { buttonSound } from './sound';
    import { onMount } from 'svelte';
    import { gameMusic } from './sound.js';
    import BackgroundAnimation from './BackgroundAnimation.svelte';
    import TypingAnimation from './TypingAnimation.svelte'; 

    onMount(() => {
      gameMusic();
    });

    function start(){
      buttonSound()
      navigate("/rule")
    }
</script>
  
<div class="flex items-center justify-center h-screen w-screen">
  <div class="flex flex-col items-center justify-around">
    <div class="text-6xl w-96 text-center">
      <TypingAnimation />
    </div>
    <div class="p-10">
      <button
        on:click={start}
        class="rounded-full btn custom-btn w-80 text-white text-2xl"
        >
        Start
      </button>
    </div>
  </div>
  <BackgroundAnimation maxNumbers={10} speed={50} />
</div>

  
  