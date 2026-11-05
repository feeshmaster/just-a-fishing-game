import type { Vector2 } from '../types'
import Entity from './entity'

export default class Viewport {
    pos: Vector2 = { x: 0, y: 0 }
    zoom: number = 2.5
    following?: Entity 
    constructor(pos?: Vector2, zoom?: number) {
        this.pos = pos ? pos : this.pos
        this.zoom = zoom ? zoom : this.zoom
    }
    follow(entity?: Entity) {
        this.following = entity
    } 
    tick(viewWidth?: number, viewHeight?: number, worldWidth?: number, worldHeight?: number) {
        if (this.following) {
            this.pos = {
                x: this.following.pos.x + this.following.width / 2,
                y: this.following.pos.y + this.following.height / 2,
            }
        }

        if (viewWidth && viewHeight && worldWidth && worldHeight) {
            const halfViewWidth = Math.min(viewWidth / (2 * this.zoom), worldWidth / 2)
            const halfViewHeight = Math.min(viewHeight / (2 * this.zoom), worldHeight / 2)
            this.pos = {
                x: Math.max(halfViewWidth, Math.min(worldWidth - halfViewWidth, this.pos.x)),
                y: Math.max(halfViewHeight, Math.min(worldHeight - halfViewHeight, this.pos.y)),
            }
        }
    }

    applyTransform(ctx: CanvasRenderingContext2D, viewWidth: number, viewHeight: number) {
        ctx.translate(viewWidth / 2, viewHeight / 2)
        ctx.scale(this.zoom, this.zoom)
        ctx.translate(-this.pos.x, -this.pos.y)
    }
}