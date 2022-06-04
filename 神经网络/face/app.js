const video = document.getElementById("video");
const start = () => {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(
    stream => {
      video.srcObject = stream;
    },
    err => {
      console.log(err)
    }
  );
}

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("./modules"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./modules"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./modules"),
  faceapi.nets.faceExpressionNet.loadFromUri("./modules"),
]).then(start());

video.addEventListener('play', () => {

  const canvas = faceapi.createCanvasFromMedia(video);
  const ctx = canvas.getContext('2d');
  canvas.width = video.width;
  canvas.height = video.height;
  document.body.append(canvas);

  const displaySize = {
    width: video.width,
    height: video.height
  };

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const resizedDetections = faceapi.resizeResults(detections, displaySize);


    console.log(resizedDetections)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})