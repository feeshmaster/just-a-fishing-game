

/*const keys = {
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
})*/

type KeyMap = {
    [identifier: string]: {
        [key: string]: {func: Function, ctrl_only: boolean}
    }
}

type Keys = {
    [key: string]: {pressed: boolean, ctrl?: boolean}
}

export default class KeyboardHandler {
    keys: Keys = {}
    keyMap: KeyMap = {}
    constructor() {
        window.addEventListener("keydown", (e) => {
            e.preventDefault()
            const key = e.key.toLowerCase()
            if (this.keys[key]) {
                this.keys[key].pressed = true
            }
        });
        window.addEventListener("keyup", (e) => {
            e.preventDefault()
            const key = e.key.toLowerCase()
            if (this.keys[key]) {
                this.keys[key].pressed = false
            }
        })
    }
    bind(key: string, identifier: string, func: () => void, ctrl_only: boolean = false) {
        key = key.toLowerCase()
        if (!this.keys[key]) {
            this.keys[key] = {pressed: false}
        }
        if (!this.keyMap[identifier]) {
            this.keyMap[identifier] = {}
        }

        this.keyMap[identifier][key] = {func: func, ctrl_only: ctrl_only}
    }
    unbind(key: string, identifier: string) {
        delete this.keyMap[identifier]?.[key.toLowerCase()]
    }

    update() {
        for (const identifier in this.keyMap) {
            for (const key in this.keyMap[identifier]) {
                if (this.keys[key]?.pressed) {
                    if (this.keys[key]?.ctrl && !this.keyMap[identifier][key].ctrl_only) return
                    this.keyMap[identifier][key].func()
                }
            }
        }
    }
}
