import Boundary from './boundary'
import type { Vector2 } from '../types'
import { TILE_SIZE } from '../constants'

export default class TriggerBoundary extends Boundary {
  static width = TILE_SIZE * 4
  static height = TILE_SIZE * 4
  triggerFunc: Function
  constructor(ctx: CanvasRenderingContext2D, pos: Vector2) {
      super(ctx, pos)
      this.width = TriggerBoundary.width
      this.height = TriggerBoundary.height
      this.triggerFunc = () => {}
    }
  
  trigger() {
    this.triggerFunc()
  }
  
  setTrigger(func: Function) {
    this.triggerFunc = func
  }
}