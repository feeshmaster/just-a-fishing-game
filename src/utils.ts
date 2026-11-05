import Sprite from './classes/sprite'
import Entity from './classes/entity'
export function setSpriteImage(spriteObj: Sprite, sprite: {img: any, frameDelay: number}) {
  if (spriteObj.image == sprite.img && spriteObj.frameDelay == sprite.frameDelay) return
  spriteObj.image = sprite.img
  spriteObj.frameDelay = sprite.frameDelay
  spriteObj.frames = {...spriteObj.frames, max: spriteObj.image.width/spriteObj.width, currentFrame: 0, elapsed: 0}
  spriteObj.width = spriteObj.width || spriteObj.image.width/spriteObj.frames.max
  spriteObj.height = spriteObj.height || spriteObj.image.height
  spriteObj.frames.frameDelay = sprite.frameDelay
}


export function rectangularCollision({ rectangle1, rectangle2 }: { rectangle1: Entity, rectangle2: Entity }) {
  return (
    rectangle1.pos.x + (rectangle1.hitboxWidth || rectangle1.width) >= rectangle2.pos.x && 
    rectangle1.pos.x <= rectangle2.pos.x + (rectangle2.hitboxWidth || rectangle2.width) &&
    rectangle1.pos.y + (rectangle1.hitboxHeight || rectangle1.height) >= rectangle2.pos.y &&
    rectangle1.pos.y <= rectangle2.pos.y + (rectangle2.hitboxHeight || rectangle2.height)
    )
}
