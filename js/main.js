
const button = document.getElementById("play-b"),
      tumbler = document.getElementsByClassName("control-b-on")[0];
      track1 = document.getElementById("stay"),
      track2 = document.getElementById("perfect"),
      track3 = document.getElementById("addicted"),
       audio = document.getElementById("audio"),
      record = document.getElementById("record");


    console.dir(audio);

    button.addEventListener('change', function (event) {
        audio.paused ? audio.play() : audio.pause();
    });

//---------------------------------------------------------
    track1.addEventListener('click', function (event) {
        audio.setAttribute('src', "./audio/1.mp3");

    });

    track2.addEventListener('click', function (event) {
        audio.setAttribute('src', "./audio/2.mp3");

    });

    track3.addEventListener('click', function (event) {
        audio.setAttribute('src', "./audio/3.mp3");

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