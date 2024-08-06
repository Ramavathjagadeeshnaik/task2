document.addEventListener('DOMContentLoaded', () => {
    const addPlaylistBtn = document.getElementById('add-playlist');
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const volumeSlider = document.getElementById('volume');
    const audioPlayer = document.getElementById('audio-player');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeDisplay = document.getElementById('current-time');
    const durationDisplay = document.getElementById('duration');

    let playlists = [];
    let currentPlaylist = [];
    let currentTrackIndex = 0;

    addPlaylistBtn.addEventListener('click', addPlaylist);
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPreviousTrack);
    nextBtn.addEventListener('click', playNextTrack);
    volumeSlider.addEventListener('input', adjustVolume);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);

    function addPlaylist() {
        const playlistNameInput = document.getElementById('playlist-name');
        const playlistName = playlistNameInput.value.trim();
        if (playlistName) {
            playlists.push({ name: playlistName, tracks: [] });
            const playlistItem = document.createElement('li');
            playlistItem.textContent = playlistName;
            playlistItem.addEventListener('click', () => selectPlaylist(playlistName));
            document.getElementById('playlists').appendChild(playlistItem);
            playlistNameInput.value = '';
        }
    }

    function selectPlaylist(playlistName) {
        currentPlaylist = playlists.find(pl => pl.name === playlistName).tracks;
        renderTracks();
    }

    function renderTracks() {
        const tracksDiv = document.getElementById('tracks');
        tracksDiv.innerHTML = '';
        currentPlaylist.forEach((track, index) => {
            const trackDiv = document.createElement('div');
            trackDiv.textContent = track.name;
            trackDiv.addEventListener('click', () => playTrack(index));
            tracksDiv.appendChild(trackDiv);
        });
    }

    function playTrack(index) {
        currentTrackIndex = index;
        audioPlayer.src = currentPlaylist[currentTrackIndex].url;
        audioPlayer.play();
        playPauseBtn.textContent = 'Pause';
    }

    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'Play';
        }
    }

    function playPreviousTrack() {
        if (currentTrackIndex > 0) {
            currentTrackIndex--;
            playTrack(currentTrackIndex);
        }
    }

    function playNextTrack() {
        if (currentTrackIndex < currentPlaylist.length - 1) {
            currentTrackIndex++;
            playTrack(currentTrackIndex);
        }
    }

    function adjustVolume() {
        audioPlayer.volume = volumeSlider.value;
    }

    function updateProgress() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    }

    function updateDuration() {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
});
