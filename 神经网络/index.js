const datas = [
  [[0, 0], 0],
  [[0, 1], 0],
  [[1, 0], 0],
  [[1, 1], 1],
]

const weights = []

for (let i = 0; i < 3; i++) {
  weights[i] = Math.random() - 0.5;
}

// 激活神经网络
function calcOutput(inputs) {
  let output = inputs[0] * weights[0] + inputs[1] * weights[1] + 1 * weights[2]
  return sigmoid(output)
}


// 计算错误大小
function errRate(output, excepted) {
  return Math.abs(output - excepted)
}

//计算n此错误率的平均值
const errors = []
const maxError = 20
function calcError(err) {
  errors.push(err)
  if (errors.length > maxError) {
    errors.shift()
  }
  return errors.reduce((tmp, item) => tmp + item) / errors.length
}

//调整权重
const d = 0.000001
const trainRate = 0.1
let times = 1
const threshold = 0.001
function train(inputs, excepted) {
  let err = errRate(calcOutput(inputs), excepted)
  const dw = []
  weights.forEach((el, i) => {
    weights[i] += d;
    let newErr = errRate(calcOutput(inputs), excepted)

    dw[i] = (newErr - err) / d

    weights[i] = el
  })

  weights.forEach((el, i) => {
    weights[i] -= dw[i] * trainRate;
  })

  let e = calcError(err)

  times++

  if (times % 5000 === 0) {
    console.log(`#${times} ${e}`)
  }

  return e <= threshold

}

for (i = 0; ; i++) {
  let data = datas[i % datas.length]
  if (train(data[0], data[1]) === true) {
    break
  }
}

console.log(weights)


function sigmoid(x) {
  return 1 / (1 + Math.pow(Math.E, -x));
}


