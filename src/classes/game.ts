import { worlds } from "../data/worlds/worlds"
import Boundary from './boundary'
import Trigger from './trigger'
import Viewport from './viewport'

/*interface GameData {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    aspect_ratio: [number, number]
    resizeCanvas: Function,

    collisionMap: Array<any>,
    triggerMap: Array<any>
}*/
//TODO: PLEASE implement positions being based off of tile size, that would be so much better, because right now it varies on the canvas size im pretty sure
//PLEASEE dont forget to look at this
export default class Game {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    aspect_ratio: [number, number] = [1024, 575]
    viewport: Viewport = new Viewport()
    world = worlds.main
    collisionMap: Array<any> = []
    triggerMap: Array<any> = []
    boundaries: Array<Boundary> = []
    triggers: Array<Trigger> = []
    constructor() {
        const canvas = document.querySelector<HTMLCanvasElement>("#game")
        if (!canvas) {
            throw new Error("Canvas element not found");
        }
        this.canvas = canvas
        canvas.width = 1024
        canvas.height = 575
        const ctx = this.canvas.getContext("2d")
        if (!ctx) {
            throw new Error("Canvas rendering context not found");
        }
        this.ctx = ctx

        for (let i = 0;i<this.world.collisions.length;i+=70) { this.collisionMap.push(this.world.collisions.slice(i, i+this.world.WORLD_WIDTH)) }
        for (let i = 0; i < this.world.triggers.length; i += 70) { this.triggerMap.push(this.world.triggers.slice(i, i + this.world.WORLD_WIDTH)) }
        
        this.collisionMap.forEach((row: Array<number>, i)=> {
            row.forEach((num, j) => {
                if (num !== 0) {
                    this.boundaries.push(new Boundary({
                        pos: {
                            x:j*Boundary.width+offset.x,
                            y:i*Boundary.height+offset.y
                        }
                    }))
                }
            })
        })


    }
    resizeCanvas() {
        const scaleWidth = window.innerWidth / this.aspect_ratio[0];
        const scaleHeight = window.innerHeight / this.aspect_ratio[1];
        const scale = Math.max(scaleWidth, scaleHeight); 
        this.canvas.width = this.aspect_ratio[0] * scale;
        this.canvas.height = this.aspect_ratio[1] * scale;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${(window.innerWidth - this.canvas.width) / 2}px`;
        this.canvas.style.top = `${(window.innerHeight - this.canvas.height) / 2}px`;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(scale, scale);
    }
}