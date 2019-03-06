export const pan = (matrix, dx, dy) => {
  matrix[4] += dx
  matrix[5] += dy
  return matrix
}

export const zoom = (matrix, zoomLevel) => {
  matrix[0] = zoomLevel
  matrix[3] = zoomLevel
  return matrix
}
