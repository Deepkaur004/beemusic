let currentMusic = 0;

// Audio Element
const audio = document.querySelector("#audio");

// Song slider Element
const slideBar = document.querySelector(".seek-bar");

// Song Name and artist Name Element
const audioName = document.querySelector(".song-name");
const Artist = document.querySelector(".artist-name");

//Disk Elememt
const disk = document.querySelector(".disk"); 

// Current Time Element and song duration Element
const currentSongTime = document.querySelector(".current-time");
const songDurationTime = document.querySelector(".song-duration-time");

//Control Button
const previousButton = document.querySelector(".backward-btn");
const nextButton = document.querySelector(".forward-btn");
const playButton = document.querySelector(".play-btn");

// Adding Event Listener on play button
playButton.addEventListener("click",()=>{
    if(playButton.className.includes("pause")){
        audio.play();
    }
    else{
        audio.pause();
    }

    playButton.classList.toggle("pause");
    disk.classList.toggle("play");
});

// Setup the Music
const setMusic = (i)=>{
    slideBar.value = 0; //Set the initial value of the slider "0"

    let song = songs[i];

    currentMusic = i;

    // audio.src = song.path;
    audio.setAttribute("src", song.path);
    audioName.innerHTML = song.name;
    Artist.innerHTML = song.artist;
    disk.style.backgroundImage = `url(${song.cover})`;

    currentSongTime.innerHTML = "00 : 00";

    setTimeout(()=>{
        slideBar.max = audio.duration;
        songDurationTime.innerHTML = formatTime(audio.duration);
    }, 300)
   

}

// Formatting the time from minute and Seconds
const formatTime = (time)=>{
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;
    }

    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }

    return `${min} : ${sec}`;
}

// Making The Slidebar Running
setInterval(()=>{
    slideBar.value = audio.currentTime;
    currentSongTime.innerHTML = formatTime(audio.currentTime);
    if(Math.floor(audio.currentTime) == Math.floor(audio.duration)){
        nextButton.click();
    }
}, 500);

setMusic(0);

// Set the Music Playing Function
const playMusic = ()=>{
    audio.play();
    playButton.classList.remove("pause");
    disk.classList.add("play");
};

// Change The part OF the song using Song Slidebar
slideBar.addEventListener("change",()=>{
    audio.currentTime = slideBar.value;
})

// Change The Song Using next Button
nextButton.addEventListener("click",()=>{
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    }
    else{
        currentMusic++;
    }

    setMusic(currentMusic);
    playMusic();
});

// Change The Song using using Previous Button
previousButton.addEventListener("click",()=>{
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    }
    else{
        currentMusic--;
    }

    setMusic(currentMusic);
    playMusic();
});
