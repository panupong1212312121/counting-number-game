<script>
  import { onMount, onDestroy } from 'svelte';

  export let maxNumbers = 10; // Define the maximum number of floating elements
  export let speed = 30; // Speed of the animation

  // Define an array of themes, each with its own gradient colors and text colors
  let themes = [
    {
      name: 'Theme 1',
      gradientStart: '#fffeb3',
      gradientEnd: '#ffb3b3',
      textColors: ['#ff0000', '#ff7b00', '#ffaa00', '#754f01', '#fff700'],
    },
    {
      name: 'Theme 2',
      gradientStart: '#e4ffb3',
      gradientEnd: '#b3ffd9',
      textColors: ['#88a300', '#3ca300', '#00611d', '#00d18b'],
    },
    {
      name: 'Theme 3',
      gradientStart: '#b3ffeb',
      gradientEnd: '#c2b3ff',
      textColors: ['#02c7b3', '#018891', '#015275', '#02336e', '#0d026e'],
    },
    {
      name: 'Theme 4',
      gradientStart: '#d5b3ff',
      gradientEnd: '#ffb3b3',
      textColors: ['#38026e', '#55026e', '#ff00f7', '#a60040'],
    },
    // Add more themes as needed
  ];

  let selectedTheme = themes[0]; // Initialize with the first theme

  let backgroundColor = selectedTheme.gradientStart; // Initial background color
  let opacity = 0.1; // Opacity of the numbers

  let numbers = [];

  // Generate random numbers and initial positions
  function initializeNumbers() {
    for (let i = 1; i <= maxNumbers; i++) {
      addRandomNumber();
    }
  }

  function addRandomNumber() {
    const randomTextColor = getRandomTextColor();
    numbers.push({
      number: Math.floor(Math.random() * 9) + 1,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speedX: Math.random() * speed - speed / 2, // Random speed between -speed/2 and speed/2 in x-direction
      speedY: Math.random() * speed - speed / 2, // Random speed between -speed/2 and speed/2 in y-direction
      textColor: randomTextColor, // Assign the random text color
    });
  }

  // Function to generate a random text color from the selected theme
  function getRandomTextColor() {
    const randomIndex = Math.floor(Math.random() * selectedTheme.textColors.length);
    return selectedTheme.textColors[randomIndex];
  }

  // Function to update number positions
  function updateNumbers() {
    const maxX = window.innerWidth;
    const maxY = window.innerHeight;

    numbers = numbers.map((num) => {
      let newX = num.x + num.speedX;
      let newY = num.y + num.speedY;

      // Wrap number's position when it goes out of the screen
      if (newX > maxX) newX = 0;
      else if (newX < 0) newX = maxX;

      if (newY > maxY) newY = 0;
      else if (newY < 0) newY = maxY;

      return { ...num, x: newX, y: newY };
    });
  }

  // Function to change the background color with a smooth transition
  function changeBackgroundColor() {
    backgroundColor = getRandomColor();
  }

  // Generate a random color from the selected theme's gradient range
  function getRandomColor() {
    const randomTone = Math.random();
    const interpolatedColor = interpolateColor(
      selectedTheme.gradientStart,
      selectedTheme.gradientEnd,
      randomTone
    );
    return interpolatedColor;
  }

  // Interpolate color between two colors
  function interpolateColor(start, end, fraction) {
    const r1 = parseInt(start.slice(1, 3), 16);
    const g1 = parseInt(start.slice(3, 5), 16);
    const b1 = parseInt(start.slice(5, 7), 16);

    const r2 = parseInt(end.slice(1, 3), 16);
    const g2 = parseInt(end.slice(3, 5), 16);
    const b2 = parseInt(end.slice(5, 7), 16);

    const r = Math.round(r1 + fraction * (r2 - r1));
    const g = Math.round(g1 + fraction * (g2 - g1));
    const b = Math.round(b1 + fraction * (b2 - b1));

    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }

  // Initialize the animation and color change timer on component load
  initializeNumbers();
  const animationInterval = setInterval(updateNumbers, 50);

  // Change background color every N seconds (e.g., every 10 seconds)
  const colorChangeInterval = 10000; // 10 seconds
  onMount(() => {
    const colorChangeTimer = setInterval(changeBackgroundColor, colorChangeInterval);

    onDestroy(() => {
      // Cleanup when the component is destroyed
      clearInterval(animationInterval);
      clearInterval(colorChangeTimer);
    });
  });

  // Function to handle theme change
  function changeTheme(theme) {
    selectedTheme = themes.find((t) => t.name === theme);
    backgroundColor = getRandomColor();
    numbers = numbers.map((num) => ({
      ...num,
      textColor: getRandomTextColor(),
    }));
  }
</script>

<style>
  /* Style your background container here */
  .background-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    transition: background-color 2s; /* Smooth background color transition */
  }

  .floating-number {
    position: absolute;
    font-size: 100px;
    color: black;
  }
</style>

<div class="background-container" style="background-color: {backgroundColor}">
  {#each numbers as num (num.number)}
    <div class="floating-number" style="transform: translate({num.x}px, {num.y}px); opacity: {opacity}; color: {num.textColor}">
      {num.number}
    </div>
  {/each}
</div>

<!-- Add the theme dropdown at the upper right corner -->
<div class="absolute top-5 right-5 z-50">
  <div class="dropdown">
    <button class="btn btn-primary">Select Theme</button>
    <ul class="shadow-md dropdown-content bg-gray-300">
      {#each themes as theme (theme.name)}
        <li>
          <a on:click={() => changeTheme(theme.name)} class="block p-2 hover:bg-gray-500 cursor-pointer">
            {theme.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</div>
