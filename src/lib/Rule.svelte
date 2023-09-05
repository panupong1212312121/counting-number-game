<script>
  import { navigate } from 'svelte-routing';
  import Rule1 from './Rule/Rule1.svelte';
  import Rule2 from './Rule/Rule2.svelte';
  import Rule3 from './Rule/Rule3.svelte';
  import Rule4 from './Rule/Rule4.svelte';
  import Rule5 from './Rule/Rule5.svelte';
  import { buttonSound } from './sound';
  import { circleButtonSound } from './sound';
  import BackgroundAnimation from './BackgroundAnimation.svelte';

  let currentPage = 1;
  const totalPages = 5; // Total number of card pages
  const buttonLabelWidth = "w-24"; // Initial width for button labels

  function goToNextPage() {
    buttonSound()
    if (currentPage < totalPages) {
      currentPage++;
    } else if (currentPage === totalPages) {
        navigate('/setting'); 
    }
  }

  function goToPreviousPage() {
    buttonSound()
    if (currentPage > 1) {
      currentPage--;
    } else if (currentPage === 1) {
        navigate('/home'); 
    }
  }

  function goToPage(pageNumber) {
    circleButtonSound()
    currentPage = pageNumber;
  }
</script>

<div class="flex items-center justify-center h-screen w-screen">
  <div class="flex flex-col items-center justify-between">
    
    {#if currentPage === 1}
      <Rule1 />
    {:else if currentPage === 2}
      <Rule2 />
    {:else if currentPage === 3}
      <Rule3 />
    {:else if currentPage === 4}
      <Rule4 />
    {:else if currentPage === 5}
      <Rule5 />
    {/if}
    
    <div class="p-10">
      <div class="flex space-x-10">
        <button
          on:click={goToPreviousPage}
          class="rounded-full btn custom-btn {{buttonLabelWidth}} text-white"
        >
        <p>Back</p>
        </button>
        <div class="page-indicator">
          {#each Array.from({ length: totalPages }) as _, index}
            <div
              class="page-circle {index === currentPage - 1 ? 'active' : ''}"
              on:click={() => goToPage(index + 1)}
            ></div>
          {/each}
        </div>
        <button
          on:click={goToNextPage}
          class="rounded-full btn custom-btn {{buttonLabelWidth}} text-white"
        >
          {#if currentPage === totalPages}
            <p>Go to Setting Page</p>
          {:else}
            <p>Next</p>
          {/if}
        </button>
      </div>
    </div>
  </div>
  <BackgroundAnimation
  maxNumbers={5}
  speed={30}
/>
</div>
