import { worlds } from "../data/worlds/worlds";
import { settings } from "../data/settings";
import { PIXEL_SIZE, TILE_SIZE } from "../constants";
import type { World } from "../types";
import Boundary from "./boundary";
import Player, { player_assets, player_sprites } from "./player";
import Sprite from "./sprite";
import Trigger from "./trigger";
import Viewport from "./viewport";
import KeyboardHandler from "./keyboard_handler";
export default class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  aspect_ratio: [number, number] = [1024, 575];
  viewport: Viewport = new Viewport();
  world = worlds.main;
  collisionMap: number[][] = [];
  triggerMap: number[][] = [];
  boundaries: Boundary[] = [];
  triggers: Trigger[] = [];
  background!: Sprite;
  foreground!: Sprite;
  player!: Player;
  keyboard_handler: KeyboardHandler = new KeyboardHandler()
  constructor() {
    const canvas = document.querySelector<HTMLCanvasElement>("#game");
    if (!canvas) {
      throw new Error("Canvas element not found");
    }
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas rendering context not found");
    }
    this.ctx = ctx;
    this.loadWorld(this.world);
    this.loadMapObjects();
    this.viewport.follow(this.player);
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
    this.animate();
      this.keyboard_handler.bind("a", "movement", () => { this.player.pos.x -= 3 })
      this.keyboard_handler.bind("d", "movement", () => { this.player.pos.x += 3 })
      this.keyboard_handler.bind("w", "movement", () => { this.player.pos.y -= 3 })
      this.keyboard_handler.bind("s", "movement", ()=>{this.player.pos.y += 3})
  }

  private loadMapObjects() {
    for (let i = 0; i < this.world.collisions.length; i += this.world.WORLD_WIDTH) {
      this.collisionMap.push(
        this.world.collisions.slice(i, i + this.world.WORLD_WIDTH),
      );
    }
    for (let i = 0; i < this.world.triggers.length; i += this.world.WORLD_WIDTH) {
      this.triggerMap.push(
        this.world.triggers.slice(i, i + this.world.WORLD_WIDTH),
      );
    }

    this.collisionMap.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value !== 0) {
          this.boundaries.push(
            new Boundary(this.ctx, { x: j * TILE_SIZE, y: i * TILE_SIZE }),
          );
        }
      });
    });
    this.triggerMap.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value !== 0) {
          this.triggers.push(
            new Trigger(this.ctx, { x: j * TILE_SIZE, y: i * TILE_SIZE }),
          );
        }
      });
    });
  }

  resizeCanvas() {
    const scale = Math.max(
      window.innerWidth / this.aspect_ratio[0],
      window.innerHeight / this.aspect_ratio[1],
    );
    const displayWidth = this.aspect_ratio[0] * scale;
    const displayHeight = this.aspect_ratio[1] * scale;
    this.canvas.width = Math.round(displayWidth * PIXEL_SIZE);
    this.canvas.height = Math.round(displayHeight * PIXEL_SIZE);
    this.canvas.style.width = `${displayWidth}px`;
    this.canvas.style.height = `${displayHeight}px`;
    this.canvas.style.position = "absolute";
    this.canvas.style.left = `${(window.innerWidth - displayWidth) / 2}px`;
    this.canvas.style.top = `${(window.innerHeight - displayHeight) / 2}px`;
    this.ctx.setTransform(scale * PIXEL_SIZE, 0, 0, scale * PIXEL_SIZE, 0, 0);
    this.ctx.imageSmoothingEnabled = false;
  }

  loadWorld(world: World) {
    this.world = world;
    const width = world.WORLD_WIDTH * TILE_SIZE;
    const height = world.WORLD_HEIGHT * TILE_SIZE;
    const staticFrame = { max: 1, frameDelay: 1, currentFrame: 0, elapsed: 0 };

    this.background = new Sprite({
      ctx: this.ctx,
      pos: { x: 0, y: 0 },
      image: world.map,
      frames: staticFrame,
      width,
      height,
      sprites: {},
    });
    this.foreground = new Sprite({
      ctx: this.ctx,
      pos: { x: 0, y: 0 },
      image: world.foreground,
      frames: staticFrame,
      width,
      height,
      sprites: {},
    });
    this.player = new Player({
      ctx: this.ctx,
      pos: { x: 0, y: 0 },
      image: player_assets.down,
      frames: { max: 7, currentFrame: 0, elapsed: 0, frameDelay: 15 },
      centeredHitbox: true,
      offset: { ox: 32, oy: 32 },
      hitboxHeight: 32,
      hitboxWidth: 32,
      width: 32,
      height: 32,
      sprites: player_sprites,
    });
  }

  private animate() {
    window.requestAnimationFrame(() => this.animate());
    this.keyboard_handler.update();
    this.ctx.clearRect(0, 0, this.aspect_ratio[0], this.aspect_ratio[1]);

    this.viewport.tick(
      this.aspect_ratio[0],
      this.aspect_ratio[1],
      this.world.WORLD_WIDTH * TILE_SIZE,
      this.world.WORLD_HEIGHT * TILE_SIZE,
    );
    this.ctx.save();
    this.viewport.applyTransform(this.ctx, this.aspect_ratio[0], this.aspect_ratio[1]);

    this.drawSprite(this.background);
    if (settings.showHitboxes) {
      this.boundaries.forEach((boundary) => boundary.render());
    }
    if (settings.showTriggers) {
      this.triggers.forEach((trigger) => trigger.render());
    }
    this.drawSprite(this.player);
    this.drawSprite(this.foreground);
    this.ctx.restore();
  }

  private drawSprite(sprite: Sprite) {
    const { image, frames, pos, width, height } = sprite;
    if (!image.complete || image.naturalWidth === 0) return;

    const frameWidth = image.naturalWidth / frames.max;
    this.ctx.drawImage(
      image,
      frames.currentFrame * frameWidth,
      0,
      frameWidth,
      image.naturalHeight,
      pos.x,
      pos.y,
      width,
      height,
    );
  }
}
