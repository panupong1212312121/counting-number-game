<!-- TypingAnimation.svelte -->
<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    // Define your text to be typed
    let textToType = "Welcome! to Count Number Game With Unbeatable AI";
    let typingSpeed = 50; // Adjust the typing speed (milliseconds per character)
  
    let currentText = writable('');
    let currentTextValue = '';
  
    onMount(() => {
      typeText();
    });
  
    async function typeText() {
      for (let i = 0; i < textToType.length; i++) {
        currentTextValue += textToType[i];
        currentText.set(currentTextValue);
        await sleep(typingSpeed);
      }
    }
  
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
</script>
  
<div>
  <!-- Use $currentText to access the value from the store -->
  <p>{$currentText}</p>
</div>
  