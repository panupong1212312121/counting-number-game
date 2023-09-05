<!-- 
<script>
    import { navigate } from 'svelte-routing';
    import { onMount } from 'svelte';
    import { gameSettings , soundState} from './stores'; 
    import { fade } from 'svelte/transition';
    import { buttonSound } from './sound';
    import { loseSound } from './sound';

    //Input from setting page
    let count;
    let max;
    let final;

    //User 
    let userCount = "";
    let inputError = true;
    let textInputError = "";
    let userFirst;
    let userTurn;
    let showUserInputStatus = false;
    let showUserInput = 0;

    //Computer 
    let comCount;
    let comTurn;
    let thinking ;
    let showComInputStatus = false;
    let showComInput = 0;

    //Others
    let hoverExit = false;
    let hoverUndo = false;

    let previousGameState = null;

    let target;
    let start;

    let NumberActive = 0;
    let Sum = 0 ;

    let round = 1;

    let gameEnded = false;

    let IsUndoClicked = false;

    let audio = new Audio("./src/assets/thinking.mp3");

    //If NumberActive === max && final === 'win' -> gameEnded = true 
    $: {
        if (NumberActive === max && final === 'win') {
            userCount = ""; 
            textInputError = ""; 
            gameEnded = true; 
        } else {
            gameEnded = false; 
        }
    }


    $: { 
        if (thinking) {        
            audio.play(); // Start playing the audio
        }else{
            audio.pause(); // Pause the audio
            audio.currentTime = 0; // Reset the audio to the beginning
        }
    }

    //Retrieve value from setting page and calculate 
    const unsubscribe = gameSettings.subscribe(settings => {
        count = parseInt(settings.inputValue);
        max = parseInt(settings.inputValue2);
        final = settings.dropdownValue;
        target = final === 'lose' ? max - 1 : max;
        start = target % (count + 1);
        userFirst = start === 0 ? true : false;
        userTurn = userFirst;

        // Initialize computer's turn if it starts first
        if (!userFirst) {
            comTurn = true;
            comCount = start;
            thinking = true
            setTimeout(() => {
                handleComputerTurn(comCount);
            },2000)
        }
    });

    onMount(() => {
        return () => {
            unsubscribe();
        };
    });

    function handleExit() {
        const confirmed = confirm("Do you want to exit the game?");
        if (confirmed) {
            navigate("/home");
        } 
    }

    function undo() {
        if (!gameEnded && userTurn) { 
            if (previousGameState !== null) {
                NumberActive = previousGameState.NumberActive;
                userCount = previousGameState.userCount;
                userTurn = previousGameState.userTurn;
                comCount = previousGameState.comCount;
                comTurn = previousGameState.comTurn;
                round = previousGameState.round;
                showUserInput = 0;
                showUserInputStatus = false;
                showComInput = 0;
                showComInputStatus = false;
                thinking = false;
                inputError = false;
                textInputError = "";
                Sum = NumberActive;
                IsUndoClicked = false;
            }
        }
    }

    //Criteria determine which userCount can be entered in input box 
    function handleInput(event, field) {
        const newValue = event.target.value;
        const sanitizedValue = newValue.replace(/[^\d]/g, '');
        if (sanitizedValue.length === 1 && sanitizedValue === "0") {
            event.target.value = "";
        } else {
            if (field === "userCount") {
                userCount = sanitizedValue;
                checkFormatUserCount();
            }
        }
    }

    function checkFormatUserCount() {
        const intValue = parseInt(userCount);

        if (intValue < 1 || intValue > count || userCount === "" || isNaN(intValue)) {
            if(count<=max-NumberActive){
                inputError = true;
                textInputError = `Choose a number between 1 and ${count}`;
            }else{
                if(max-NumberActive!==1){
                    inputError = true;
                    textInputError = `Choose a number between 1 and ${max-NumberActive}`;
                }else{
                    inputError = true;
                    textInputError = `Choose a number only ${max-NumberActive}`;
                } 
            }       
        } else {
            if(intValue<=max-NumberActive){
                inputError = false;
                textInputError = "Pass";
            }
        }
        return userCount;
    }

    //User Process
    function handleUserInput() {
        buttonSound()
        let userCountValue = checkFormatUserCount();
        if (userTurn && !inputError) {
            const userCountInt = parseInt(userCountValue);

            // Save the previous game state
            previousGameState = {
                NumberActive,
                userCount,
                userTurn,
                comCount,
                comTurn,
                round,
            };

            setTimeout(() => {
                showUserInputStatus = false;
            }, 1000);

            Sum = NumberActive + userCountInt

            for (let i = 0; i < userCountInt; i++) {
                setTimeout(() => {
                    NumberActive += 1;
                }, i*200); 
            }

            let delay = userCountInt*200 + 1000
            
            if (NumberActive < max) {
                round += 1;
                userTurn = false;
                comTurn = true;
                if (comTurn && round === 1) {
                    comCount = start;
                } else if (comTurn && round !== 1) {
                    if(count + 1 - userCountInt<max-NumberActive){
                        comCount = count + 1 - userCountInt;
                    }else{
                        comCount = max-NumberActive
                    }
                }
                showUserInput = parseInt(userCount);
                userCount = "";
                textInputError = "";
                showUserInputStatus = true; 
                
                thinking = true;

                setTimeout(() => {
                    handleComputerTurn(comCount);
                }, delay + 1000); 

            } else {
                gameEnded = true;
                userCount = "";
                textInputError = "";
            }

        }
    }

    //Computer Process
    function handleComputerTurn(comCount) {
        if (comTurn && !gameEnded) {            
            showComInputStatus = true;

            setTimeout(() => {
                showComInputStatus = false;
            }, 1000); 

            showComInput = comCount;

            Sum = NumberActive + comCount

            for (let i = 0; i < comCount; i++) {
                setTimeout(() => {
                    NumberActive += 1;
                }, i*200); 
            }

            if (NumberActive >= max) {
                gameEnded = true;
            } else {
                round += 1;
                comTurn = false;
                userTurn = true;
            }
            
        }
        thinking = false;
    }

    // Check for game conditions after each update
    $: {
        if (NumberActive === max && final === 'lose') {
            gameEnded = true;
            thinking = false;
        }
    }

    $: {
        if (gameEnded === true && Sum === NumberActive) {
            loseSound()
            navigate("/end")
        }
    }

</script>

<div class="flex flex-row items-center justify-center h-screen w-screen">
    <div class="flex flex-col items-center justify-center">
        <div class="grid-box">
            <div class="box exit flex items-center justify-center" 
                on:click={handleExit}
                class:activeExit={!gameEnded} 
                on:mouseover={() => hoverExit = true}
                on:mouseout={() => hoverExit = false}
                class:hoverExit
                >
                <img src="./src/assets/exit-word-in-a-rectangular-signal-svgrepo-com.svg" alt="Exit" width="35" height="35" title="Exit the game"/>
            </div>
            <div class="box undo flex items-center justify-center" 
                on:click={undo}
                class:activeUndo={!gameEnded || userTurn}  
                on:mouseover={() => hoverUndo = true}
                on:mouseout={() => hoverUndo = false}
                class:hoverUndo
                class:disabledUndo={IsUndoClicked || comTurn || Sum > NumberActive || (round===1&&userTurn) || (round===2&&userTurn) }
                >
                <img src="./src/assets/undo-svgrepo-com.svg" alt="Undo" width="25" height="25" title="Undo"/>
            </div>
            <div class="box box1 items-center justify-center relative">
                <div class="progress-bar rounded-full">
                    <div
                        class="progress-indicator rounded-full"
                        style="width: {NumberActive / max * 100}%;"
                        class:progressGreen={NumberActive / max <= 0.4}
                        class:progressYellow={NumberActive / max > 0.4 && NumberActive / max <= 0.7}
                        class:progressRed={NumberActive / max > 0.7}
                    ></div>
                </div>
                <p class="text-4xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{NumberActive}/{max}</p>
            </div>            
            <div class="box box2 items-center justify-center rounded-full">
                {#if showUserInputStatus}
                    <p class="text-3xl text-green-500 font-bold animate__fade" transition:fade>+{showUserInput}</p>
                {/if}
                {#if showComInputStatus}
                    <p class="text-3xl text-red-500 font-bold animate__fade" transition:fade>+{showComInput}</p>
                {/if}
            </div>
            <div class="box box3 items-center justify-center rounded-full {userTurn ? 'bg-green-500' : 'bg-red-500'}">
                <p class="text-2xl font-bold">
                    {#if !gameEnded}
                        {#if userTurn}
                            Your turn
                        {:else} 
                            AI's turn
                        {/if}
                    {:else}
                        You Lose
                    {/if}
                </p>
            </div>
            <div class="box box8 flex items-center justify-center">
                {#if thinking}
                    <div class="loading-animation"></div>
                {/if}
            </div>
            <div class="box box4 items-center justify-center rounded-full bg-green-200 {userTurn ? 'opacity-100' : 'opacity-10'}">
                <p class="text-2xl font-bold">You</p>
            </div>
            <div class="box box5 items-center justify-center rounded-full bg-red-200 {comTurn ? 'opacity-100' : 'opacity-10'}">
                <p class="text-2xl font-bold">AI</p>
            </div>
            <div class="box box6 flex items-center justify-center {userTurn ? 'opacity-100' : 'opacity-10'}">
                <img src="./src/assets/human-cannonball-playground-svgrepo-com.svg" alt="Human" width="220" height="220"/>
            </div>
            <div class="box box7 flex items-center justify-center {comTurn ? 'opacity-100' : 'opacity-10'}">
                <img src="./src/assets/robot-svgrepo-com.svg" alt="AI" width="250" height="250"/>
            </div>
        </div>
        <div class="form-control mt-5 flex flex-col items-start">
            <div class="flex flex-rows items-center justify-center space-x-40">
                <span class="label-text {inputError ? 'text-red-500' : 'text-green-500'}">
                    {textInputError}
                </span>
            </div>
            <div class="my-2 flex flex-rows items-center justify-center space-x-4">
                <label class="input-group">
                    <span>
                        ต้องการนับไปอีก
                    </span>
                    <input
                        type="text"
                        class="input input-bordered {inputError ? 'border-2 border-red-500' : 'border-2 border-green-500'}"
                        bind:value={userCount}
                        on:input={(event) => handleInput(event, "userCount")}
                        disabled = {Sum > NumberActive || gameEnded || comTurn}
                    />
                </label>
                <button
                    class="rounded-full btn custom-btn w-36 text-white"
                    disabled={!userTurn ||inputError || NumberActive >= max || gameEnded || parseInt(userCount) > max - NumberActive}
                    on:click={handleUserInput}
                >
                    {gameEnded ? 'Game Over' : 'Enter'}
                </button>
            </div>
        </div>
    </div>
</div> -->