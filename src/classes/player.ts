import Entity, { type EntityConfigs } from './entity.ts'
import { settings } from '../data/settings.ts'

interface PlayerConfigs extends EntityConfigs {
  showHitbox?: boolean
}

export default class Player extends Entity {
  showHitbox: boolean

  constructor(config: PlayerConfigs) {
    super(config)
    this.showHitbox = config.showHitbox ?? false
  }

  override render() {
    this.renderSprite()

    if (settings.showHitboxes) {
      this.ctx.fillStyle = "rgba(255, 196, 0, 0.4)"
      this.ctx.fillRect(this.hitbox.x, this.hitbox.y, this.hitboxWidth || this.width, this.hitboxHeight || this.height)
    }
  }
}
