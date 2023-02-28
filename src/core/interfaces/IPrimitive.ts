export interface IPoint {
  x: number
  y: number
  z?: number
}

export interface ILine {
  startPoint: IPoint
  endPoint: IPoint
}
