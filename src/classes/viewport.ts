import type { Vector2 } from '../types'
import Entity from './entity'

export default class Viewport {
    pos: Vector2 = { x: 0, y: 0 }
    zoom: number = 1
    following?: Entity 
    constructor(pos?: Vector2, zoom?: number) {
        this.pos = pos ? pos : this.pos
        this.zoom = zoom ? zoom : this.zoom
    }
    follow(entity?: Entity) {
        this.following = entity
    } 
    tick() {
        if (this.following) {
            this.pos = this.following.pos
        }
    }
}