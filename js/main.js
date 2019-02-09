
const button = document.getElementById("play-b"),
      tumbler = document.getElementsByClassName("control-b-on")[0];
      playlist = document.getElementById("playlist"),
       audio = document.getElementById("audio"),
      record = document.getElementById("record")
      songName = document.getElementById("songName");


    console.dir(audio);

    button.addEventListener('change', function (event) {
        audio.paused ? audio.play() : audio.pause();
    });

//---------------------------------------------------------
    playlist.addEventListener('click', function (event) {
        const target = event.target;
        let src = target.getAttribute('data-src'),
        nameOfSongArr = target.textContent.split(''),
        nameOfSong;
        nameOfSong = nameOfSongArr.map((letter) => {
            return '<b>' + letter + '</b>';
        });
        nameOfSong = nameOfSong.join('');
        songName.innerHTML = nameOfSong;
    
        audio.setAttribute('src', "./audio/" + src + ".mp3");
        

    });
//---------------------------------------------------------
    audio.addEventListener("play", function (event) {
        tumbler.classList.toggle('tumbl');
        record.style.animation = "recordRotation 10s infinite linear";

    });

    audio.addEventListener("pause", function (event) {
        tumbler.classList.toggle('tumbl');
        record.style.animation = "none";
    });

    audio.addEventListener("abort", function (event) {
        tumbler.classList.toggle('tumbl');
        record.style.animation = "none";
    });
//-----------------------------------------------------------
function updateTrackTime(){
    var currTimeDiv = document.getElementById('currentTime');
    var durationDiv = document.getElementById('duration');
  
    var currTime = (Math.floor(audio.currentTime * 1000)/1000).toString(); 
    var duration = (Math.floor(audio.duration * 1000)/1000).toString();
  
    currTimeDiv.innerHTML = formatSecondsAsTime(currTime);
  
    if (isNaN(duration)){
      durationDiv.innerHTML = '00:00';
    } 
    else{
      durationDiv.innerHTML = formatSecondsAsTime(duration);
    }
  };
  function formatSecondsAsTime(secs, format) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor((secs - (hr * 3600) -  (min * 60)) * 1000) / 1000;
  
    if (min < 10){ 
      min = "0" + min; 
    }
    if (sec < 10){ 
      sec  = "0" + sec;
    }

    return min + ':' + sec;
  };

    audio.addEventListener("timeupdate", updateTrackTime);
