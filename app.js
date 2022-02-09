"use strict";
const carousel = document.querySelectorAll(".carousel img");
const moreSongsBtn = document.querySelector(".more-songs-btn");
const playlists = document.querySelector(".playlists");
const musicDashBoard = document.querySelector(".music-player");
const backHomeBtn = document.querySelector(".back-btn");
const playlistBackBtn = document.querySelector(".back-btn-playlist");
const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".current-song-name");
const redoBtn = document.querySelector(".fa-redo-alt");
const playBtn = document.querySelector(".fa-play");
const pauseBtn = document.querySelector(".fa-pause");
const stepForwardBtn = document.querySelector(".fa-step-forward");
const stepBackwardBtn = document.querySelector(".fa-step-backward");
const volumeBtn = document.querySelector(".fa-volume-up");
const artistName = document.querySelector(".artist-name");
const currentTime = document.querySelector(".current-time");
const endTime = document.querySelector(".end-time");
const dashBoardImage = document.querySelector(".big-image");
const music = document.querySelector("#audio-element");
const volumeSlider = document.querySelector(".volume-slider");
const playListSongs = document.querySelectorAll(".playlist-songs");
const playListImageIcon = document.querySelectorAll(".playlist-image-icon");
const playListSongName = document.querySelectorAll(".playlist-song-name");
const playListImage = document.querySelectorAll(".playlist-image-icon img");
let carouselImageIndex = 0,
  clickCount = 1,
  currentSongIndex = 0;

// changing the carousel at the top of app.
const changeCarouselImage = function () {
  carousel[carouselImageIndex].classList.toggle("active");
  if (carouselImageIndex >= carousel.length - 1) {
    carouselImageIndex = 0;
  } else {
    carouselImageIndex++;
  }
  carousel[carouselImageIndex].classList.toggle("active");
};

setInterval(changeCarouselImage, 2500);

// displaying music dashboard.
musicDashBoard.addEventListener("click", function () {
  if (clickCount >= 2) {
    musicDashBoard.classList.add("active");
    clickCount = 1;
    return;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
});

// accessing more songs from playlist.
moreSongsBtn.addEventListener("click", function () {
  playlists.classList.add("active");
});

// coming back to home screen from music dashboard.
backHomeBtn.addEventListener("click", function () {
  musicDashBoard.classList.remove("active");
});

// coming back to music dashboard from playlist.
playlistBackBtn.addEventListener("click", function () {
  playlists.classList.remove("active");
});

// adding pause btn.
playBtn.addEventListener("click", function () {
  music.play();
  playBtn.classList.remove("active");
  pauseBtn.classList.add("active");
});

// adding play btn.
pauseBtn.addEventListener("click", function () {
  music.pause();
  pauseBtn.classList.remove("active");
  playBtn.classList.add("active");
});

const setSong = function (index) {
  seekBar.value = 0;
  currentSongIndex = index;
  let song = songs[index];
  music.src = song.filePath;
  songName.textContent = song.songName;
  dashBoardImage.src = song.coverPath;
  artistName.textContent = song.artist;
  setTimeout(() => {
    // here we need to give seekBar maximum value otherwise it moves inaccurately.
    seekBar.max = music.duration;
    endTime.textContent = formatTime(music.duration);
  }, 300);
  currentTime.textContent = "00:00";
  playListImageIcon.forEach(function (item) {
    item.classList.remove("active");
  });
  playListImageIcon[currentSongIndex].classList.add("active");
};

setSong(0);
// making time in 00:00.
const formatTime = function (second) {
  let seconds = Math.round(second);
  let minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
};

// updating our seekbar.
setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.textContent = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) === Math.floor(seekBar.max)) {
    if (redoBtn.className.includes("active")) {
      setSong(currentSongIndex);
      playBtn.click();
    } else {
      stepForwardBtn.click();
    }
  }
}, 500);

// if we want to play from middle or anywhere we change seekbar.
seekBar.addEventListener("change", function () {
  music.currentTime = seekBar.value;
});

// handling forward button.
stepForwardBtn.addEventListener("click", function () {
  if (currentSongIndex >= songs.length - 1) {
    currentSongIndex = 0;
  } else {
    currentSongIndex++;
  }
  setSong(currentSongIndex);
  playBtn.click();
});

stepBackwardBtn.addEventListener("click", function () {
  if (currentSongIndex <= 0) {
    currentSongIndex = songs.length - 1;
  } else {
    currentSongIndex--;
  }
  setSong(currentSongIndex);
  playBtn.click();
});

// handling repeat song button.
redoBtn.addEventListener("click", function () {
  redoBtn.classList.toggle("active");
});

// handling volume button.
volumeBtn.addEventListener("click", function () {
  volumeBtn.classList.toggle("active");
  volumeSlider.classList.toggle("active");
  setTimeout(() => {
    volumeBtn.classList.toggle("active");
    volumeSlider.classList.toggle("active");
  }, 3500);
});

volumeSlider.addEventListener("input", function () {
  music.volume = volumeSlider.value;
});

// handling playlist songs play and pause button.
playListSongs.forEach(function (item, i) {
  item.addEventListener("click", function () {
    setSong(i);
    playBtn.click();
  });
});
