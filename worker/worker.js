onmessage = e => {
  console.log(e.data.msg, 9999999);
  postMessage({ msg: 'Worker: Worker正在处理您的消息！！' });
  if (e.data.state) {
    let time = 0;
    setInterval(() => {
      postMessage({ msg: time++ })
    }, 1000)
  }
}