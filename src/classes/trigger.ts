import Boundary from './boundary'
import type { Vector2 } from '../types'

export default class TriggerBoundary extends Boundary {
  static width = 64
  static height = 64
  triggerFunc: Function
  constructor(ctx: CanvasRenderingContext2D, pos: Vector2) {
      super(ctx, pos)
      this.triggerFunc = () => {}
    }
  
  trigger() {
    this.triggerFunc()
  }
  
  setTrigger(func: Function) {
    this.triggerFunc = func
  }
}