
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
