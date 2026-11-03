import type { Offset } from '../types.ts'
import Sprite, { type SpriteConfigs } from './sprite.ts'
import { settings } from '../data/settings.ts'
export interface EntityConfigs extends SpriteConfigs {
  hitboxWidth?: number
  hitboxHeight?: number
  centeredHitbox?: boolean
}

export interface Hitbox {
  x: number
  y: number
  width: number
  height: number
}

export default class Entity extends Sprite {
  hitboxWidth: number
  hitboxHeight: number
  centeredHitbox: boolean
  moving = false

  constructor(config: EntityConfigs) {
    super(config)
    this.hitboxWidth = config.hitboxWidth ?? config.width
    this.hitboxHeight = config.hitboxHeight ?? config.height
    this.centeredHitbox = config.centeredHitbox ?? false
  }

  get hitbox(): Hitbox {
    const offset: Offset = this.offset
    return {
      x: this.pos.x + offset.ox,
      y: this.pos.y + offset.oy,
      width: this.hitboxWidth || this.width,
      height: this.hitboxHeight || this.height,
    }
  }

  update() {
  }

  protected renderSprite() {
    super.render()
  }

  render() {  
    this.renderSprite()

    if (settings.showHitboxes) {
      this.ctx.fillStyle = "rgba(255, 196, 0, 0.4)"
      this.ctx.fillRect(this.hitbox.x, this.hitbox.y, this.hitboxWidth || this.width, this.hitboxHeight || this.height)
    }
  }
}
