import { approxEqual, toDegrees, toRadians, sum } from './utils.mjs'


// 线性代数
// 1. 向量
class Vector {
  constructor(...components) {
    this.components = components
  }

  // 加法
  add({ components }) {
    return new Vector(
      ...components.map((el, index) => this.components[index] + el)
    )
  }

  // 减法
  subtract({ components }) {
    return new Vector(
      ...components.map((el, index) => this.components[index] - el)
    )
  }

  // 缩放
  scaleBy(number) {
    return new Vector(
      ...this.components.map(el => el * number)
    )
  }

  // 向量的模
  length() {
    return Math.hypot(...this.components)
  }

  // 点积
  dotProduct({ components }) {
    return components.reduce((acc, el, index) => {
      return acc + el * this.components[index]
    }, 0)
  }

  // 叉积(只适用于3维向量)
  crossProduct({ components }) {
    return new Vector(
      this.components[1] * components[2] - this.components[2] * components[1],
      this.components[2] * components[0] - this.components[0] * components[2],
      this.components[0] * components[1] - this.components[1] * components[0]
    )
  }


  // 归一化
  normalize() {
    return this.scaleBy(1 / this.length())
  }

  // 通过点积判断向量的相对位置

  // 方向相同
  sameDirection(other) {
    const dotProduct = this.normalize().dotProduct(other.normalize())
    return approxEqual(dotProduct, 1)
  }

  // 方向相反
  oppositeDirection(other) {
    const dotProduct = this.normalize().dotProduct(other.normalize())
    return approxEqual(dotProduct, -1)
  }

  // 垂直
  perpendicular(other) {
    const dotProduct = this.normalize().dotProduct(other.normalize())
    return approxEqual(dotProduct, 0)
  }

  // 获取夹角
  angleBetween(other) {
    return toDegrees(
      Math.acos(
        this.dotProduct(other) /
        other.length() * this.length()
      )
    )
  }

  // 反向
  negate() {
    return this.scaleBy(-1)
  }

  // 投影
  projection(other) {
    const normal = other.normalize()
    return normal.scaleBy(this.dotProduct(normal))
  }

  // 设定长度
  setLength(newLength) {
    return this.normalize().scaleBy(newLength)
  }

  // 判断相等
  equal({ components }) {
    return components.every((el, index) => approxEqual(el, this.components[index]))
  }

  // 线性变换(矩阵方程)
  transform(matrix) {
    const columns = matrix.columns()
    if (columns.length !== this.components.length) {
      throw new Error('矩阵和向量的长度不相等')
    }

    const multiple = columns.map((column, i) => column.map(v => v * this.components[i]))
    const newComponents = multiple[0].map((_, i) => sum(multiple.map(column => column[i])))
    return new Vector(...newComponents)
  }
}

export default Vector