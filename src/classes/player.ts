import Entity, { type EntityConfigs } from './entity.ts'
import { settings } from '../data/settings.ts'

const playerUpImage = new Image()
playerUpImage.src = new URL('../assets/playerUp.png', import.meta.url).href

const playerDownImage = new Image()
playerDownImage.src = new URL('../assets/playerDown.png', import.meta.url).href

const playerLeftImage = new Image()
playerLeftImage.src = new URL('../assets/playerLeft.png', import.meta.url).href

const playerRightImage = new Image()
playerRightImage.src = new URL('../assets/playerRight.png', import.meta.url).href

const playerIdleUpImage = new Image()
playerIdleUpImage.src = new URL('../assets/playerIdleUp.png', import.meta.url).href

const playerIdleDownImage = new Image()
playerIdleDownImage.src = new URL('../assets/playerIdleDown.png', import.meta.url).href

const playerIdleLeftImage = new Image()
playerIdleLeftImage.src = new URL('../assets/playerIdleLeft.png', import.meta.url).href

const playerIdleRightImage = new Image()
playerIdleRightImage.src = new URL('../assets/playerIdleRight.png', import.meta.url).href

/*
export const player_assets = {
  playerUpImage: playerUpImage,
  playerDownImage: playerDownImage,
  playerLeftImage: playerLeftImage,
  playerRightImage: playerRightImage,
  playerIdleUpImage: playerIdleUpImage,
  playerIdleDownImage: playerIdleDownImage,
  playerIdleLeftImage: playerIdleLeftImage,
  playerIdleRightImage: playerIdleRightImage
} 
*/
export const player_assets = {
  up: playerUpImage,
  down: playerDownImage,
  left: playerLeftImage,
  right: playerRightImage,
  idleUp: playerIdleUpImage,
  idleDown: playerIdleDownImage,
  idleLeft: playerIdleLeftImage,
  idleRight: playerIdleRightImage
} 

export const player_sprites = {
  up: {img: playerUpImage, valMax: 15},
  down: {img: playerDownImage, valMax: 15},
  left: {img: playerLeftImage, valMax: 15},
  right: {img: playerRightImage, valMax: 15},
  idleUp: {img: playerIdleUpImage, valMax: 15},
  idleDown: {img: playerIdleDownImage, valMax: 15},
  idleLeft: {img: playerIdleLeftImage, valMax: 15},
  idleRight: {img: playerIdleRightImage, valMax: 15},
} 


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
