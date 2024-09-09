import Vector from './vector.mjs'
import Matrix from './matrix.mjs'

// 向量
const a = new Vector(4, 7)
const b = new Vector(8, 4)

console.log(a.projection(b).length() / b.length())
console.log(a.dotProduct(b))
console.log(b.length() ** 2)
console.log(b.length() * 3 / 4 === a.projection(b).length())
console.log(b.setLength(5))

const c = new Vector(12, 23)
const d = new Vector(23, 12)

console.log(c.equal(d))


const i = new Vector(1, 0)
const j = new Vector(0, 1)

const firstCoeff = 2
const secondCoeff = 5
const linerCombination = i.scaleBy(firstCoeff).add(j.scaleBy(secondCoeff))
console.log(linerCombination, 666666)


// 矩阵
const matrix = new Matrix(
  [0, 1],
  [2, 3],
  [4, 5]
)

console.log(matrix)
console.log(matrix.rows[1])
console.log(matrix.columns())



const vector2D = new Vector(3, 5)
const vector3D = new Vector(3, 5, 2)
const matrix2x2D = new Matrix(
  [1, 2],
  [3, 4]
)
const matrix2x3D = new Matrix(
  [1, 2, 3],
  [4, 5, 6]
)
const matrix3x2D = new Matrix(
  [1, 2],
  [3, 4],
  [5, 6]
)

console.log(vector3D.transform(matrix2x3D), 6666)
console.log(vector2D.transform(matrix2x2D), 6666)
console.log(vector2D.transform(matrix3x2D), 6666)

const matrix4 = new Matrix(
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10, 11]
)
console.log(matrix4.columns())
console.log(matrix4.transpose())