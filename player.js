const playBtn = document.querySelector(".big");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
// const playAndPauseBtnToggle = document.querySelector("#toggle");
const playList = document.querySelector("#playlist");
const songMenu = document.querySelector(".song-menu");
const shuffleBtn = document.querySelector(".shuffle");
const loopBtn = document.querySelector(".loop");
const playListBtn = document.querySelector(".play-list-btn");
const volumeSlider = document.getElementById("slider");
const volumeBtn = document.querySelector(".volume-btn");
const seekSlider = document.getElementById("seeker");
// const playList = document.getElementById('playlist');

//variables
let filler = document.querySelector(".fill-bar");
let thumb = document.querySelector(".thumb");
let songtitle = document.querySelector("marquee");

function playMusic() {
  let song = new Audio();
  let currentSong = 0;
  let songCount = 0;

  const songs = [
    {
      name: "Be Still",
      artist: "Travis Greene",
      src: "songs/beStill.mp3",
    },
    {
      name: "ChinwoAMANAMO",
      artist: "Chris Morgan ft Mercy",
      src: "songs/Chris Morgan ft Mercy ChinwoAMANAMO.mp3",
    },
    {
      name: "idi-mma",
      artist: "Emoss",
      src: "songs/idi-mma by Emoss.mp3",
    },

    {
      name: "Imenem",
      artist: "Mercy-Chinwo",
      src: "songs/Imenem  by Mercy Chinwo.mp3",
    },
    {
      name: "Akamdinelu",
      artist: "Mercy Chinwo",
      src: "songs/Mercy Chinwo - Akamdinelu.mp3",
    },
    {
      name: "OKEMMUO",
      artist: "Chioma Jesus Ft. Mercy Chinwo",
      src: "songs/Chioma Jesus Ft. Mercy Chinwo - OKEMMUO.mp3",
    },
    {
      name: "No Other Name",
      artist: "Frank-Edwards",
      src: "songs/Frank-Edwards- No Other Name.mp3",
    },
    {
      name: "You No Dey Use Me Play",
      artist: "Ema",
      src: "songs/Ema - You No Dey Use Me Play.mp3",
    },
    {
      name: "Believers Anthem, Holy",
      artist: "Frank-Edwards",
      src: "songs/Frank_Edwards_-_Believers_Anthem_Holy.mp3",
    },
    {
      name: "I Am",
      artist: "Mercy Chiwno",
      src: "songs/Mercy-Chinwo-I-Am.mp3",
    },
    {
      name: "I Wont Go Back",
      artist: "William-McDowell",
      src: "songs/William-McDowell-I-Wont-Go-Back.mp3",
    },
  ];

  song.src = songs[currentSong].src;
  songtitle.innerHTML = songs[currentSong].name;
  song.pause();

  //listeners
  playBtn.addEventListener("click", playBtnfun);
  nextBtn.addEventListener("click", nextBtnfun);
  previousBtn.addEventListener("click", preBtnfun);
  loopBtn.addEventListener("click", () => {
    loopBtn.classList.toggle("active");
    if ((loopBtn.classNameContains = "active")) {
      song.loop = true;
    }
  });
  shuffleBtn.addEventListener("click", () =>
    shuffleBtn.classList.toggle("active")
  );
  playListBtn.addEventListener("click", () =>
    playList.classList.toggle("active")
  );
  volumeBtn.addEventListener(
    "click",
    () => (volumeSlider.style.visibility = "visible")
  );
  volumeSlider.addEventListener(
    "mouseleave",
    (e) => (volumeSlider.style.visibility = "hidden")
  );
  volumeSlider.addEventListener("mousemove", setvolume);
  song.addEventListener("timeupdate", setSongProgress);
  song.addEventListener("ended", autoNextSong);

  // my functions
  addPlayList();

  function playBtnfun() {
    if (song.paused) {
      playBtn.childNodes[0].setAttribute("class", "fas fa-pause fa-3x");
      songtitle.innerHTML = songs[currentSong].name;
      playingIndicator();
      song.play();
    } else {
      song.pause();
      noIndicator();
      playBtn.childNodes[0].setAttribute("class", "fas fa-play fa-3x");
    }
  }

  function shuffleMusic() {
    currentSong = Math.floor(Math.random() * songs.length - 1);
    song.src = songs[currentSong].src;
    songtitle.innerHTML = songs[currentSong].name;
    song.play();
  }

  function autoNextSong() {
    if (
      shuffleBtn.className.includes("active") &&
      !loopBtn.className.includes("active")
    ) {
      songCount++;
      if (songCount >= songs.length) {
        song.play();
        songCount = 0;
      } else {
        shuffleMusic();
      }
    } else if (
      shuffleBtn.className.includes("active") &&
      loopBtn.className.includes("active")
    ) {
      shuffleMusic();
    } else if (
      !loopBtn.className.includes("active") &&
      !shuffleBtn.className.includes("active")
    ) {
      nextBtnfun();
      console.log("should next now");
    } else if (
      !loopBtn.className.includes("active") &&
      currentSong === songs.length - 1
    ) {
      song.pause();
    } else {
      song.play();
    }
  }

  function nextBtnfun() {
    currentSong++;
    if (currentSong > songs.length - 1) {
      currentSong = 0;
    }
    song.src = songs[currentSong].src;
    songtitle.innerHTML = songs[currentSong].name;
    playBtn.childNodes[0].setAttribute("class", "fas fa-pause fa-3x");
    playingIndicator();
    song.play();
  }

  function preBtnfun() {
    currentSong--;

    if (currentSong < 0) {
      currentSong = songs.length - 1;
    }
    song.src = songs[currentSong].src;
    songtitle.innerHTML = songs[currentSong].name;
    playBtn.childNodes[0].setAttribute("class", "fas fa-pause fa-3x");
    playingIndicator();
    song.play();
  }

  function playingIndicator() {
    playBtn.setAttribute("class", "big border1");
  }
  function noIndicator() {
    playBtn.setAttribute("class", "big ");
  }
  function setvolume() {
    song.volume = volumeSlider.value / 100;
    if (song.volume === 0) {
      volumeBtn.childNodes[0].setAttribute("class", "fas fa-volume-mute fa-2x");
    } else {
      volumeBtn.childNodes[0].setAttribute("class", "fas fa-volume-up fa-2x");
    }
  }

  function setSongProgress() {
    let progress = (song.currentTime / song.duration) * 100;
    filler.style.width = progress + "%";
    thumb.style.marginLeft = progress - 2 + "%";
  }
  // as i click on the track update my song progress
  seekSlider.addEventListener("click", updateProress);
  function updateProress(element) {
    let width = this.clientWidth;
    let clickX = element.offsetX;
    let duration = song.duration;
    song.currentTime = (clickX / width) * duration;
  }

  // let seeking = false;
  // seekSlider.addEventListener("mousedown", (event) => {
  //   seeking = true;
  //   seek(event);
  // });
  // seekSlider.addEventListener("mousemove", (element) => {
  //   updateProress(element);
  // });
  // seekSlider.addEventListener("mouseup", () => (seeking = false));

  // function seek(event) {
  //   if (seeking) {
  //     seekSlider.value = event.clientX - seekSlider.offsetLeft;
  //     seekTo = song.duration * (seekSlider.value / 100);
  //     song.currentTime = seekTo;
  //   }
  //   //song.play();
  // }

  function addPlayList() {
    for (let i = 0; i < songs.length; i++) {
      let item = document.createElement("li");
      item.innerHTML = `${songs[i].artist} - ${songs[i].name}`;
      playList.appendChild(item);

      item.addEventListener("click", (e) => {
        song.src = songs[i].src;
        songtitle.innerHTML = songs[i].name;
        playBtn.childNodes[0].getAttribute("class");
        playBtn.childNodes[0].setAttribute("class", "fas fa-pause fa-3x");
        playingIndicator();
        song.play();
      });
    }
  }
}
window.addEventListener("load", playMusic);
