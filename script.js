
const player = document.querySelector('.player');
const vedio = document.querySelector(".vedio");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const speed =document.querySelector('.player-speed')
const fullscreenBtn = document.querySelector(".fullscreen");

//play or pause
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
}

function toggleplay() {
  if (vedio.paused) {
    vedio.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "pause");
  } else {
    vedio.pause();
    showPlayIcon();
  }
}

//on vedio ended show play icon
if (vedio) {
  vedio.addEventListener("ended", showPlayIcon);
}
//calculate display time formate
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes} : ${seconds}`;
}

//update progress bar as the vedio plays
function updateprogress() {
  progressBar.style.width = `${(vedio.currentTime / vedio.duration) * 100}%`;
  currentTime.textContent = `${displayTime(vedio.currentTime)}/`;
  duration.textContent = `${displayTime(vedio.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  vedio.currentTime = newTime * vedio.duration;
}
let lastVolume = 1;
// volum bar

function changeVolume(e) {
  let volume = e.offsetX / progressRange.offsetWidth;
  // rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  vedio.volume = volume;
  // change icon of volume
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
  lastVolume = volume;
}
function toggleMute() {
  if (vedio.volume) {
    lastVolume = vedio.volume;
    vedio.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "unmute");
  } else {
    vedio.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "mute");
  }
}
function changeSpeed(){
vedio.playbackRate= speed.value;
}
/* View in fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      /* Firefox */
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE/Edge */
      element.msRequestFullscreen();
    }
    vedio.classList.add('vedio-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
    vedio.classList.remove('video-fullscreen');
  }
  
  let fullscreen = false;
  // Toggle fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
      openFullscreen(player);
    } else {
      closeFullscreen();
    }
    fullscreen = !fullscreen;
  }

// add event listners
playBtn.addEventListener("click", toggleplay);
if (vedio) {
  vedio.addEventListener("click", toggleplay);
  vedio.addEventListener("timeupdate", updateprogress);
  vedio.addEventListener("canplay", updateprogress);
  progressRange.addEventListener("click", setProgress);
  volumeRange.addEventListener("click", changeVolume);
  volumeIcon.addEventListener("click", toggleMute);
  speed.addEventListener('change',changeSpeed);
  fullscreenBtn.addEventListener('click', toggleFullscreen);
}
