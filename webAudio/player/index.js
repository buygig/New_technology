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

const audioContext = new AudioContext();

let file = null;
record.addEventListener('click', () => {
  input.click();
  input.addEventListener("change", () => {
    file = input.files[0];
    let html = `<span>${file.name}</span>`;
    title.innerHTML = html;
    loadFile(file)
    readAsArrayBuffer(file).then(res => {
      playAudio(res).start();
    })
  })
})

function readAsArrayBuffer(file) {
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
}

function loadFile(file) {
  let url = file.urn || file.name;
  ID3.loadTags(url, function () {
    showTags(url);
  }, {
    tags: ["picture"],
    dataReader: ID3.FileAPIReader(file)
  });
}

function showTags(url) {
  let tags = ID3.getAllTags(url);
  let image = tags.picture;

  if (image) {
    let base64String = "";
    for (let i = 0; i < image.data.length; i++) {
      base64String += String.fromCharCode(image.data[i]);
    }
    let base64 = "data:" + image.format + ";base64," +
      window.btoa(base64String);
    record.style.backgroundImage = `url(${base64})`;
  } else {
    record.style.background = "#000";
  }
}

let currentTime = null;
function playAudio(fileResult) {
  audioContext.suspend();
  const source = audioContext.createBufferSource();
  audioContext.decodeAudioData(fileResult).then(result => {
    source.buffer = result;
    source.connect(audioContext.destination);
    progress.setAttribute('max', source.buffer.duration)
  });
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
