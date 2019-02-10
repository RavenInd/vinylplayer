//-----------------------Variables---------------------------------
const button = document.getElementById("play-b"),
      tumbler = document.getElementsByClassName("control-b-on")[0];
      playlist = document.getElementById("playlist"),
      audio = document.getElementById("audio"),
      record = document.getElementById("record")
      songName = document.getElementById("songName")
      toneArm = document.getElementById("toneArm"),
      tracker = document.getElementById("tracker"),
      trackerInactiveZone = document.getElementById("trackerInactiveZone");

//-----------------------Button handling function---------------------------------

    function buttonHandler(event) {
        audio.paused ? audio.play() : audio.pause();
    }

//-----------------------Playlist handling function---------------------------------
    function playlistHandler (event) {
        if(!audio.paused) {
            tumbler.classList.toggle('tumbl');
        }

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
    };
    //-----------------------Tracker Handler function------------------------

function trackerHandler(event) {
    
    const trackerRect = tracker.getBoundingClientRect(),
          trackerInactiveZoneRect = trackerInactiveZone.getBoundingClientRect(),
          trackerLength = (trackerRect.width - trackerInactiveZoneRect.width)/2,
          centerX = trackerInactiveZoneRect.x + trackerInactiveZoneRect.width/2 - trackerRect.x,  //center of record X
          centerY = trackerInactiveZoneRect.y + trackerInactiveZoneRect.height/2 - trackerRect.y; // center of record Y

    let xLength,
        yLength,
        restLengthOfTracker,
        restTimeOfTrack,
        restToneArmRotationDeg;

        if (centerX >= event.offsetX) {
            xLength = centerX - event.offsetX;
        } else {
            xLength = event.offsetX - centerX;
        }

        if (centerY >= event.offsetY) {
            yLength = centerY - event.offsetY;
        } else {
            yLength = event.offsetY - centerY;
        }

    restLengthOfTracker = Math.round((Math.sqrt(Math.pow(xLength,2) + Math.pow(yLength,2)) - trackerInactiveZoneRect.width/2) * 1000) / 1000; //Вычисляем сколько осталось до конца трека.

    restTimeOfTrack = Math.round(audio.duration * restLengthOfTracker/trackerLength * 1000)/1000;
    restToneArmRotationDeg = Math.round(23 * restLengthOfTracker/trackerLength * 1000)/1000;

    if(audio.getAttribute('src')) {  //Debuggin to miss error <Failed to set the 'currentTime' property on 'HTMLMediaElement'>
        
        toneArm.style.animationName = "none";
        toneArm.style.animationDuration = "0.000000000s";
        toneArm.style.animationPlayState = "paused";
        toneArm.style.transform = `rotate(${restToneArmRotationDeg - 13}deg)`;
        toneArm.style.animationName = "toneArmMovement";
        toneArm.style.animationDuration = `${restTimeOfTrack}s`;

        if(!audio.paused) {
            toneArm.style.animationPlayState = "running";
        }
        audio.currentTime = audio.duration - restTimeOfTrack;
    }
}


//-----------------------Play, pause and abort handling---------------------------------


    function play(event) {

        tumbler.classList.toggle('tumbl');
        record.style.animationPlayState = "running";

        if(!toneArm.style.animationName) {
            toneArm.style.animationName = "toneArmMovement";
            toneArm.style.animationDuration = audio.duration + "s";
            toneArm.style.animationTimingFunction = "linear";
            toneArm.style.animationPlayState = "running";
        } else {
            toneArm.style.animationPlayState = "running";
        }
    };

    function pause (event) {
        tumbler.classList.toggle('tumbl');
        record.style.animationPlayState = "paused";
        toneArm.style.animationPlayState = "paused";
    }

    function abort (event) {
        record.style.animationPlayState = "paused";
        toneArm.style.animationName = "";
        toneArm.style.transform = "rotate(10deg)";
    };

//-----------------------Formating and updating Time Tracker---------------------------------
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

//-----------------------Event Listeners---------------------------------

    audio.addEventListener("timeupdate", updateTrackTime);
    audio.addEventListener("play", play);
    audio.addEventListener("pause", pause);
    audio.addEventListener("abort", abort);
    playlist.addEventListener('click', playlistHandler);
    button.addEventListener('change', buttonHandler);
    tracker.addEventListener('click', trackerHandler);





    