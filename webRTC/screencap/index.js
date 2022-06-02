const start = document.querySelector('#start');
const record = document.querySelector('#record');
const download = document.querySelector('#download');
const video = document.querySelector('video');

let mediaRecorder;
let isRecording = false;
let recordedBlobs = [];

start.addEventListener('click', () => {
  navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
    .then(stream => {
      start.disabled = true;
      video.srcObject = stream;
      window.stream = stream;
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        showMsg('用户停止分享屏幕')
        start.disabled = false;
        record.disabled = true
      })
      record.disabled = false;
    }, err => {
      showMsg(`getDisplayMedia on err: ${err.name}`, err);
    })

})

record.addEventListener('click', e => {

  let text = e.target.textContent;
  if (text === '开始录制') {
    startRecording()
  } else if (text === '停止录制') {
    stopRecord()
  }
})

function getSupportedMimeTypes() {
  const possibleTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=h264,opus',
    'video/mp4;codecs=h264,aac',
  ];
  return possibleTypes.filter(mimeType => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
}

function startRecording() {
  recordedBlobs = [];
  const mimeType = getSupportedMimeTypes();
  const options = { mimeType: mimeType[2] };
  try {
    mediaRecorder = new MediaRecorder(window.stream, options)
  } catch (e) {
    showMsg(`创建MediaRrcorder出错：${JSON.stringify(e)}`)
    return;
  }

  record.textContent = '停止录制';
  isRecording = true;
  download.disabled = true;
  mediaRecorder.onstop = (event) => {
    showMsg('录制停止了: ' + event);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  showMsg('录制开始 mediaRecorder: ' + mediaRecorder);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function stopRecord() {
  isRecording = false;
  mediaRecorder.stop();
  download.disabled = false;
  record.textContent = "开始录制";
}

download.addEventListener('click', () => {
  const blob = new Blob(recordedBlobs, { type: 'video/webm' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'reocrd_' + new Date().getTime() + '.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
});


function showMsg(msg, err) {
  const msgDom = document.querySelector('#msg');
  msgDom.innerHTML += `<p>${msg}</p>`;
  if (err) {
    console.log(err)
  }
}
