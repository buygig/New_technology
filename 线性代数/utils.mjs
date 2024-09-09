const EPSILON = 0.00000001

// 约等于
export function approxEqual(x, y, epsilon = EPSILON) {
  return Math.abs(x - y) < epsilon
}

// 弧度转角度
export function toDegrees(radians) {
  return (radians * 180) / Math.PI
}

// 角度转弧度
export function toRadians(degree) {
  return (degree * Math.PI) / 180
}

export function sum(arr) {
  return arr.reduce((acc, value) => acc + value, 0)
} 