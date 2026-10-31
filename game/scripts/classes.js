class Sprite {
    constructor({ pos, velocity, image, frames = { max: 1 }, width, height, isCentered, centeredOffset, isPlayer, hitboxWidth, hitboxHeight, sprites, framesValMax = 15}) {
        this.pos = pos
        this.centeredOffset = centeredOffset//for smaller hitboxes :thumbsup:
        this.image = image
        this.valMax = framesValMax
        this.frames = {...frames, val: 0, elapsed: 0, valMax: framesValMax}
        this.isCentered = isCentered
        this.sprites = sprites
        this.isPlayer = isPlayer
        this.hitboxWidth = hitboxWidth
        this.hitboxHeight = hitboxHeight
        this.image.onload = () => {
        this.width = width || this.image.width/this.frames.max
        this.height = height || this.image.height
        this.moving = false
        if (this.isCentered) {
          this.uncenteredPos = {
            x: this.pos.x,
            y: this.pos.y
          }
          this.pos.x = this.pos.x + this.hitboxWidth/2+this.centeredOffset
          this.pos.y = this.pos.y + this.hitboxHeight/2+this.centeredOffset
        }
        }
    }
    render() {
      ctx.drawImage(
        this.image,
        this.frames.val*this.width,
        0,
        this.image.width/this.frames.max,
        this.image.height,
        this.isCentered? this.uncenteredPos? this.uncenteredPos.x : this.pos.x : this.pos.x,
        this.isCentered? this.uncenteredPos? this.uncenteredPos.y : this.pos.y: this.pos.y,
        this.image.width/this.frames.max,
        this.image.height,
      )
      if (this.moving) {
        if (this.frames.max > 1) {
          this.frames.elapsed++
        }
        if (this.frames.elapsed % this.frames.valMax === 0) {
          if (this.frames.val < this.frames.max-1) this.frames.val++
          else this.frames.val = 0
        }
      }

      if (!this.isPlayer || !renderHitboxes) return
      ctx.fillStyle = "rgba(255,255,0,0.4)"
      ctx.fillRect(this.pos.x, this.pos.y, this.hitboxWidth || this.width, this.hitboxHeight || this.height)
    }
}

class Boundary {
    static width = 64
    static height = 64
    static triggerFunc = () => {}
    constructor({pos}) {
      this.pos = pos
      this.width = 64
      this.height = 64
    }
  
    render() {
      ctx.fillStyle = "rgba(255,0,0,0.4)"
      ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
  }

class TriggerBoundary extends Boundary {
  static width = 64
  static height = 64
  render() {
    ctx.fillStyle = "rgba(51,255,235,0.4)"
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
  }
  
  trigger() {
    this.triggerFunc()
  }
  
  setTrigger(func) {
    this.triggerFunc = func
  }
}