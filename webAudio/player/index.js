const input = document.querySelector('input');

const record = document.querySelector(".record");
const play = document.querySelector('.play');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const svgPlay = document.querySelector('#play');
const svgStop = document.querySelector('#stop');

const msg = document.querySelector('.msg');
const progress = document.querySelector('progress')
const title = document.querySelector('.title');

const fileReader = new FileReader();
const audioContext = new AudioContext();


let file = null;
record.addEventListener('click', () => {
  input.click();
  input.addEventListener("change", e => {
    file = input.files[0];
    let html = `<span>${file.name}</span>`;
    title.innerHTML = html;
    playAudio(file).start();
    audioContext.suspend();
  })
})

let currentTime = null;
function playAudio(file) {
  const source = audioContext.createBufferSource();
  fileReader.readAsArrayBuffer(file);
  fileReader.onload = async () => {
    const result = await audioContext.decodeAudioData(fileReader.result);
    source.buffer = result;
    source.connect(audioContext.destination);
    progress.setAttribute('max', source.buffer.duration)
  }
  return source;
};



let playTag = false;
play.addEventListener('click', () => {
  let timer = null;
  if (playTag) {
    audioContext.suspend();
    clearInterval(timer)
    timer = null;
    playTag = false
    msg.classList.remove('up')
    record.style["animation-play-state"] = "paused";
    svgPlay.style.display = 'block';
    svgStop.style.display = 'none';
  } else {
    audioContext.resume();
    timer = setInterval(() => {
      progress.setAttribute('value', audioContext.currentTime)
    }, 500)

    // var anime = function () {
    //   progress.setAttribute('value', audioContext.currentTime)
    //   requestAnimationFrame(anime);
    // };
    // anime();

    playTag = true;
    msg.classList.add('up')
    record.style["animation-play-state"] = "running";
    svgPlay.style.display = 'none';
    svgStop.style.display = 'block';
  }


})
