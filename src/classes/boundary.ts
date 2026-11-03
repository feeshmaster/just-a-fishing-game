import type { Vector2 } from "../types";


export default class Boundary {
    static width = 64
    static height = 64
    width: number;
    height: number;
    pos: Vector2
    ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D, pos: Vector2) {
      this.pos = pos
      this.width = 64
      this.height = 64
      this.ctx = ctx
    }
  
    render() {
      this.ctx.fillStyle = "rgba(255,0,0,0.4)"
      this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}

