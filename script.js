const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');

// List of songs
const songs = [
    { title: "Song 1", src: "song1.mp3" },
    { title: "Song 2", src: "song2.mp3" },
    { title: "Song 3", src: "song3.mp3" }
];

let currentSongIndex = 0;

// Function to load a song
function loadSong(song) {
    songTitle.textContent = song.title;
    audio.src = song.src;
    audio.load();
}

// Load the first song
loadSong(songs[currentSongIndex]);

// Play or pause the audio
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "❚❚ Pause";
    } else {
        audio.pause();
        playButton.textContent = "▶ Play";
    }
});

// Next song
nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
});

// Previous song
prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
});

// Update current time and duration
audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    currentTimeDisplay.textContent = formatTime(currentTime);
    durationDisplay.textContent = formatTime(duration);
    progressBar.value = (currentTime / duration) * 100;
});

// Format time in mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Seek audio on progress bar change
progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});
