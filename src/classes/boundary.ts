import type { Vector2 } from "../types";
import { TILE_SIZE } from "../constants";


export default class Boundary {
    static width = TILE_SIZE
    static height = TILE_SIZE
    width: number;
    height: number;
    pos: Vector2
    ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D, pos: Vector2) {
      this.pos = pos
      this.width = Boundary.width
      this.height = Boundary.height
      this.ctx = ctx
    }
  
    render() {
      this.ctx.fillStyle = "rgba(255,0,0,0.4)"
      this.ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}
