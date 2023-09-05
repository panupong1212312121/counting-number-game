export function buttonSound() {
    const audio = new Audio("./src/assets/clickButton.mp3");
    audio.play();
}

export function circleButtonSound() {
    const audio = new Audio("./src/assets/clickCircle.mp3");
    audio.play();
}

export function loseSound() {
    const audio = new Audio("./src/assets/lose.mp3");
    audio.play();
}

let audio;
let isMusicPlaying = false;
let restartTimeout;

export function gameMusic() {
    if (!isMusicPlaying) {
        audio = new Audio("./src/assets/gameMusic.mp3");
        isMusicPlaying = true;

        audio.play();

        audio.addEventListener("ended", function () {
            // When the audio finishes playing, reset isMusicPlaying and audio
            isMusicPlaying = false;
            audio = null;

            // Delay the restart of the music by, for example, 5 seconds (5000 milliseconds)
            const restartDelay = 5000;

            restartTimeout = setTimeout(() => {
                gameMusic(); // Play the music again after the delay
            }, restartDelay);
        });
    }
}

export function stopMusic() {
    if (isMusicPlaying && audio) {
        audio.pause();
        audio.currentTime = 0;
        isMusicPlaying = false;

        // Clear the restart timeout if the music is manually stopped
        if (restartTimeout) {
            clearTimeout(restartTimeout);
            restartTimeout = null;
        }
    }
}