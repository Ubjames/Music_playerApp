const playBtn = document.querySelector(".big");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
const playAndPauseBtnToggle = document.querySelector("#toggle");
const togglePoster = document.querySelector("#poster-shadow");
const playList = document.querySelector("ul");
const songMenu = document.querySelector(".song-menu");
const shuffleBtn = document.querySelector(".shuffle");
const loopBtn = document.querySelector(".loop");
const playListBtn = document.querySelector(".play-list-btn");
const volumeSlider = document.getElementById("slider");
const volumeBtn = document.querySelector(".volume-btn");
// const playList = document.getElementById('playlist');

//variables
let filler = document.querySelector(".fill-bar");
let thumb = document.querySelector(".thumb");
let songtitle = document.querySelector("marquee");
let song = new Audio();
let currentSong = 0;

// const songs = ["beStill.mp3","Mercy Chinwo - Akamdinelu.mp3", "Chris Morgan ft Mercy ChinwoAMANAMO.mp3", "idi-mma by Emoss.mp3", "Imenem  by Mercy Chinwo.mp3",]

const songs = [
	{
		name: "Be Still",
		artist:"Travis Greene",
		src:"songs/beStill.mp3"
	},
	{	name:"ChinwoAMANAMO",
		artist:"Chris Morgan ft Mercy",
		src:"songs/Chris Morgan ft Mercy ChinwoAMANAMO.mp3"
	},
	{
		name:"idi-mma",
		artist:"Emoss",
		src:"songs/idi-mma by Emoss.mp3"
	},

	{
		name:"Imenem",
		artist:"Mercy-Chinwo",
		src:"songs/Imenem  by Mercy Chinwo.mp3"
	},
	{
		name:"Akamdinelu",
		artist:"Mercy Chinwo",
		src:"songs/Mercy Chinwo - Akamdinelu.mp3"
	},
	{
		name:"OKEMMUO",
		artist:"Chioma Jesus Ft. Mercy Chinwo",
		src:"songs/Chioma Jesus Ft. Mercy Chinwo - OKEMMUO.mp3"
	},

]
	
 function playMusic(){
	song.src = songs[currentSong].src;
	songtitle.innerHTML = songs[currentSong].name;
	playingIndicator()
	song.play();
}

//listeners
playBtn.addEventListener('click', playBtnfun);
nextBtn.addEventListener('click', nextBtnfun);
previousBtn.addEventListener('click', preBtnfun);
loopBtn.addEventListener('click', () => loopBtn.classList.toggle("active"));
shuffleBtn.addEventListener("click", () => shuffleBtn.classList.toggle("active"));
playListBtn.addEventListener("click", () => playList.classList.toggle("active"));
volumeBtn.addEventListener("click", () => volumeSlider.style.visibility="visible");
volumeSlider.addEventListener('mousemove', setvolume);
volumeSlider.addEventListener('mouseleave', (e) => volumeSlider.style.visibility="hidden");
song.addEventListener("timeupdate", setSongProgress);
// playListBtn.addEventListener("click",addPlayList);

addPlayList();


/**************************************************
  function on button to trigger the player event and toggle btw play/pause icons
 **************************************************/

function playBtnfun(){
	if(song.paused){
			playAndPauseBtnToggle.getAttribute('src');
			playAndPauseBtnToggle.setAttribute("src","icons/pause.png");
      		playingIndicator();
			song.play();
		
		
	}else{
			song.pause();
			noIndicator();
			playAndPauseBtnToggle.getAttribute('src');
			playAndPauseBtnToggle.setAttribute("src","icons/play.png");
		}
}

	// function shuffleMusic(){
	// 	song.src = songs[Math.floor(Math.random() * songs.length)].src;
	// 	song.play();
	//   }

function loopBtnFun(){
loopBtn.getAttribute("class");
loopBtn.setAttribute("class", "active-now shuffle");
	
}

	  function inactive(){
		loopBtn.getAttribute("class");
		loopBtn.setAttribute("class", "shuffle");
	  }

function nextBtnfun(){ 
		currentSong++;
		if(currentSong > songs.length - 1){
			currentSong = 0;
		}
	  	song.src = songs[currentSong].src;
		songtitle.innerHTML = songs[currentSong].name;
		song.play();	
	}

function preBtnfun(){ 
	currentSong--;
 	
	if(currentSong < 0){
		currentSong = songs.length - 1;
		console.log(currentSong)
	}
  	song.src = songs[currentSong].src;
	songtitle.innerHTML = songs[currentSong].name;

song.play();	
}


function playingIndicator(){
	playBtn.getAttribute("class");
	playBtn.setAttribute("class", "big border1");

}
function noIndicator(){
	playBtn.setAttribute("class", "big ");

}
function setvolume() {
	let volume = document.getElementById('volume')
	song.volume = volumeSlider.value / 100;
		if(song.volume === 0){
			
			volume.getAttribute("src")
			volume.setAttribute("src", "icons/volume-muted.png")


		} else{
			volume.getAttribute("src")
			volume.setAttribute("src", "icons/volume.png")
		
	}

  }


function setSongProgress(){
	let progress = song.currentTime / song.duration;
	if(progress >0){
		seekSlider.value = progress;
	}

  }
const seekSlider = document.getElementById('seeker');
let seeking = false;

 seekSlider.addEventListener("mousedown", (event) =>{seeking = true; seek(event)});
 seekSlider.addEventListener("mousemove", (event) =>{ seek(event) });
 seekSlider.addEventListener("mouseup", ()=> seeking = false);

  function seek(event) {
	if (seeking) {
		seekSlider.value = event.clientX - seekSlider.offsetLeft;
		seekTo = song.duration * (seekSlider.value / 100);
		song.currentTime = seekTo;
	} 
	song.play();
  }

function addPlayList() {
	for (let i = 0; i < songs.length; i++) {
	  let item = document.createElement("li");
	  item.innerHTML = songs[i].name;
	  playList.appendChild(item);
	}
}
playList.onclick = (event)=>{
	console.log(event) //why is this not working??
};
