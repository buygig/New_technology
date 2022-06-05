const audio = document.querySelector('audio');

console.log(audio, 777)

const record = document.querySelector(".record");
const play = document.querySelector('.play');
const msg = document.querySelector('.msg');

function playAudio(file) {
  const fileReader = new FileReader();
  const audioContext = new AudioContext();
  fileReader.readAsArrayBuffer(file);
  fileReader.onload = () => {
    audioContext.decodeAudioData(fileReader.result, (result) => {
      //创建播放源
      const source = audioContext.createBufferSource();
      source.buffer = result;
      //连接输出终端
      source.connect(audioContext.destination);
      //开始播放
      source.start();
    });
  }
};

let playTag = false;

play.addEventListener('click', () => {
  if (playTag) {
    audio.pause();
    playTag = false
    msg.classList.remove('up')
    record.style["animation-play-state"] = "paused";
  } else {
    audio.play()
    playTag = true;
    msg.classList.add('up')
    record.style["animation-play-state"] = "running";
  }
})
