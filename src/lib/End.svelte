<script>

    import { navigate } from 'svelte-routing';
    import { buttonSound } from './sound';

    function PlayAgain() {
        buttonSound()
        navigate("/play")
    }

    function GoToSettings() {
        buttonSound()
        navigate("/setting"); 
    }

    function GoToHome() {
        buttonSound()
        navigate("/home"); 
    }

</script>

<div class="flex flex-row items-center justify-center h-screen w-screen">
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-center justify-center my-10">
            <p class="text-center text-6xl font-bold text-align">Game Over</p>
        </div>
        <div class="flex flex-col items-center justify-center my-10">
            <p class="text-center text-6xl font-bold text-align">You Lose</p>
        </div>
        <div class="flex flex-row items-center justify-center space-x-5 my-10">
            <div class="rounded-full btn custom-btn w-60 text-white text-2xl">
                <button on:click={PlayAgain}>Play Again</button>
            </div>
            <div class="rounded-full btn custom-btn w-60 text-white text-2xl">
                <button on:click={GoToSettings}>Go to Settings</button>
            </div>
            <div class="rounded-full btn custom-btn w-60 text-white text-2xl">
                <button on:click={GoToHome}>Go to Home</button>
            </div>     
        </div>
    </div>
</div>


