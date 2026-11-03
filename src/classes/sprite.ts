import type { Vector2, Frames, Offset } from '../types.ts'

export interface SpriteConfigs {
    pos: Vector2;
    image: HTMLImageElement;
    frames: Frames;
    width: number;
    height: number;
    offset?: Offset;
    sprites: object;
    ctx: CanvasRenderingContext2D

}

export default class Sprite {
    pos: Vector2;
    image: HTMLImageElement;
    frames: Frames;
    width: number;
    height: number;
    offset: Offset;
    sprites: object;
    frameDelay: number;
    ctx: CanvasRenderingContext2D
    animating: boolean

    constructor({ ctx, pos, image, frames = { max: 1, frameDelay: 1, currentFrame: 0, elapsed: 0 }, offset, width, height, sprites }: SpriteConfigs) {
        this.ctx = ctx
        this.pos = pos
        this.height = height
        this.width = width
        this.offset = offset ?? { ox: 0, oy: 0 }
        this.image = image
        this.frameDelay = frames.frameDelay
        this.frames = frames
        this.sprites = sprites
        this.animating = false
        this.image.onload = () => {
            this.width = width || this.image.width / this.frames.max
            this.height = height || this.image.height
            this.animating = false
        }
    }
    render() {
        this.ctx.drawImage(
            this.image,
            this.frames.currentFrame * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.pos.x,
            this.pos.y,
            this.image.width / this.frames.max,
            this.image.height,
        )
        if (this.animating) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % this.frames.frameDelay === 0) {
                if (this.frames.currentFrame < this.frames.max - 1) this.frames.currentFrame++
                else this.frames.currentFrame = 0
            }
        }
    }
}
