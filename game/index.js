//canvas fitting
const canvas = document.getElementById("game");
canvas.width = 1024
canvas.height = 575
const aspect_ratio = [1024, 576]

//game functionality
const ctx = canvas.getContext("2d")

function resizeCanvas() {
  const scaleWidth = window.innerWidth / aspect_ratio[0];
  const scaleHeight = window.innerHeight / aspect_ratio[1];
  const scale = Math.max(scaleWidth, scaleHeight); 
  canvas.width = aspect_ratio[0] * scale;
  canvas.height = aspect_ratio[1] * scale;
  canvas.style.position = 'absolute';
  canvas.style.left = `${(window.innerWidth - canvas.width) / 2}px`;
  canvas.style.top = `${(window.innerHeight - canvas.height) / 2}px`;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(scale, scale);
  
}

window.addEventListener('resize', resizeCanvas);
window.onload = resizeCanvas;

const collisionMap = []
const triggerArray = []

let renderHitboxes = false
let renderTriggers = false

for (let i = 0;i<collisions.length;i+=70) { collisionMap.push(collisions.slice(i, i+70)) }
for (let i = 0;i<triggers.length;i+=70) { triggerArray.push(triggers.slice(i, i+70)) }





const offset = {
  x: -150,
  y: -500
}

const boundaries = []

collisionMap.forEach((row, i)=> {
  row.forEach((num, j) => {
    if (num !== 0) {
    boundaries.push(new Boundary({
      pos: {
        x:j*Boundary.width+offset.x,
        y:i*Boundary.height+offset.y
      }
    }))
   }
  })
})

const triggerMap = []

triggerArray.forEach((row, i)=> {
  row.forEach((num, j) => {
    if (num !== 0) {
    triggerMap.push(new TriggerBoundary({
      pos: {
        x:j*TriggerBoundary.width+offset.x,
        y:i*TriggerBoundary.height+offset.y
      }
    }))
   }
  })
})

const mapImage = new Image()
mapImage.src = './Assets/MainIsland.png'

const foregroundImage = new Image()
foregroundImage.src = "./Assets/foreground.png"

const playerUpImage = new Image()
playerUpImage.src = './Assets/playerUp.png'

const playerDownImage = new Image()
playerDownImage.src = './Assets/playerDown.png'

const playerLeftImage = new Image()
playerLeftImage.src = './Assets/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './Assets/playerRight.png'

const playerIdleUpImage = new Image()
playerIdleUpImage.src = './Assets/playerIdleUp.png'

const playerIdleDownImage = new Image()
playerIdleDownImage.src = './Assets/playerIdleDown.png'

const playerIdleLeftImage = new Image()
playerIdleLeftImage.src = './Assets/playerIdleLeft.png'

const playerIdleRightImage = new Image()
playerIdleRightImage.src = './Assets/playerIdleRight.png'



const player = new Sprite({
  pos: {
      x: (canvas.width / 2 - (playerDownImage.width / 7) / 2)-48,
      y: (canvas.height / 2 - playerDownImage.height / 2)-48,
  },
  image: playerDownImage,
  frames: { max: 7 },
  isCentered: true,
  centeredOffset: 32,
  isPlayer: true,
  hitboxHeight: 32,
  hitboxWidth: 32,
  sprites: {
    up: {img: playerUpImage, valMax: 15},
    down: {img: playerDownImage, valMax: 15},
    left: {img: playerLeftImage, valMax: 15},
    right: {img: playerRightImage, valMax: 15},
    idleUp: {img: playerIdleUpImage, valMax: 25},
    idleDown: {img: playerIdleDownImage, valMax: 25},
    idleLeft: {img: playerIdleLeftImage, valMax: 25},
    idleRight: {img: playerIdleRightImage, valMax: 25},
  },
});

const background = new Sprite({pos: { x: offset.x, y: offset.y }, image: mapImage})

const foreground = new Sprite({pos: { x: offset.x, y: offset.y }, image: foregroundImage})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

function toggleHitboxRendering() {
  renderHitboxes = !renderHitboxes
}

function toggleTriggerRendering() {
  renderTriggers = !renderTriggers
}

function setSpriteImage(spriteObj, sprite) {
  if (spriteObj.image == sprite.img && spriteObj.valMax == sprite.valMax) return
  spriteObj.image = sprite.img
  spriteObj.valMax = sprite.valMax
  spriteObj.frames = {...spriteObj.frames, max: spriteObj.image.width/spriteObj.width, val: 0, elapsed: 0}
  spriteObj.width = spriteObj.width || spriteObj.image.width/spriteObj.frames.max
  spriteObj.height = spriteObj.height || spriteObj.image.height
  spriteObj.frames.valMax = sprite.valMax
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.pos.x + (rectangle1.hitboxWidth || rectangle1.width) >= rectangle2.pos.x && 
    rectangle1.pos.x <= rectangle2.pos.x + (rectangle2.hitboxWidth || rectangle2.width) &&
    rectangle1.pos.y + (rectangle1.hitboxHeight || rectangle1.height) >= rectangle2.pos.y &&
    rectangle1.pos.y <= rectangle2.pos.y + (rectangle2.hitboxHeight || rectangle2.height)
    )
}

const moveables = [background, ...boundaries, foreground, ...triggerMap]
function animate() {
  window.requestAnimationFrame(animate)
  background.render()
  if (renderHitboxes) {
    boundaries.forEach(boundary => {
      boundary.render()
    
    })
  }
  if (renderTriggers) {
    triggerMap.forEach(trigger => {
      trigger.render()
    })
  }
  player.render()
  foreground.render()
  let moving = true
  if (keys.w.pressed && lastKey === "w") {
    player.moving = true
    setSpriteImage(player, player.sprites.up)
    for (let boundary of boundaries) {
      if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, pos: {x:boundary.pos.x, y:boundary.pos.y + 2 }}})) {
        player.moving = false
        moving = false
        break
      }
    }

    moveables.forEach(moveable=>{
      if (!moving) return
      moveable.pos.y += 2
    })
  } else if (keys.a.pressed && lastKey === "a") {
    player.moving = true
    setSpriteImage(player, player.sprites.left)
    for (let boundary of boundaries) {
      if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, pos: {x:boundary.pos.x+2, y:boundary.pos.y}}})) {
        player.moving = false
        moving = false
        break
      }
    }
    moveables.forEach(moveable=>{
      if (!moving) return
      moveable.pos.x += 2
    })
  } else if (keys.s.pressed && lastKey === "s") {
    player.moving = true
    setSpriteImage(player, player.sprites.down)
    for (let boundary of boundaries) {
      if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, pos: {x:boundary.pos.x, y:boundary.pos.y-2}}})) {
        player.moving = false
        moving = false
        break
      }
    }
    moveables.forEach(moveable=>{
      if (!moving) return
      moveable.pos.y -= 2
    })
  } else if (keys.d.pressed && lastKey === "d") {
    player.moving = true
    setSpriteImage(player, player.sprites.right)
    for (let boundary of boundaries) {
      if (rectangularCollision({rectangle1: player, rectangle2: {...boundary, pos: {x:boundary.pos.x-2, y:boundary.pos.y}}})) {
        moving = false
        player.moving = false
        break
      }
    }
    moveables.forEach(moveable=>{
      if (!moving) return
      moveable.pos.x -= 2
    })
  }
}
animate()
let lastKey
window.addEventListener("keydown", (e) => {
    keyMap = {
        "w" : () =>{keys.w.pressed = true;lastKey="w";},
        "a" : () =>{keys.a.pressed = true;lastKey="a";},
        "s" : () =>{keys.s.pressed = true;lastKey="s";},
        "d" : () =>{keys.d.pressed = true;lastKey="d";},
        "arrowUp" : () =>{keys.w.pressed = true;lastKey="w";},
        "arrowLeft" : () =>{keys.a.pressed = true;lastKey="a";},
        "arrowDown" : () =>{keys.s.pressed = true;lastKey="s";},
        "arrowRight" : () =>{keys.d.pressed = true;lastKey="d";},
        "h" : () => {toggleHitboxRendering()},
        "t" : () => {toggleTriggerRendering()}
        
    }
    if (e.key in keyMap) {
        keyMap[e.key]()
      }
})

window.addEventListener("keyup", (e) => {
    keyMap = {
        "w" : () =>{keys.w.pressed = false;setSpriteImage(player, player.sprites.idleUp)},
        "a" : () =>{keys.a.pressed = false;setSpriteImage(player, player.sprites.idleLeft)},
        "s" : () =>{keys.s.pressed = false;setSpriteImage(player, player.sprites.idleDown)},
        "d" : () =>{keys.d.pressed = false;setSpriteImage(player, player.sprites.idleRight)},
        "arrowUp" : () =>{keys.w.pressed = false;setSpriteImage(player, player.sprites.idleUp)},
        "arrowLeft" : () =>{keys.a.pressed = false;setSpriteImage(player, player.sprites.idleLeft)},
        "arrowDown" : () =>{keys.s.pressed = false;setSpriteImage(player, player.sprites.idleDown)},
        "arrowRight" : () =>{keys.d.pressed = false;setSpriteImage(player, player.sprites.idleRight)},
    }
    if (e.key in keyMap) {
        keyMap[e.key]()
      }
})



