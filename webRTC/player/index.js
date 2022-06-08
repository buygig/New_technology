const input = document.querySelector('input');

const record = document.querySelector(".record");
const play = document.querySelector('.play');
const msg = document.querySelector('.msg');
const title = document.querySelector('.title');

const fileReader = new FileReader();
const audioContext = new AudioContext();

let source = null;
let file = null;
record.addEventListener('click', () => {
  input.click();
  input.addEventListener("change", (e) => {
    console.log(e)
    file = input.files[0];
    let html = `<span>${file.name}</span>`;
    title.innerHTML = html;
    source = playAudio(file);
    source.start();
    audioContext.suspend();

  })
})


function playAudio(file) {
  const source = audioContext.createBufferSource();
  fileReader.readAsArrayBuffer(file);
  fileReader.onload = async () => {
    const result = await audioContext.decodeAudioData(fileReader.result);
    source.buffer = result;
    source.connect(audioContext.destination);
  }
  return source;
};


let playTag = false;
let currentTime = null;

play.addEventListener('click', () => {
  if (playTag) {
    audioContext.suspend();
    playTag = false
    msg.classList.remove('up')
    record.style["animation-play-state"] = "paused";
  } else {
    audioContext.resume();
    playTag = true;
    msg.classList.add('up')
    record.style["animation-play-state"] = "running";
  }
})
