export type Vector2 = {
    x: number;
    y: number;
}; //TODO: maybe add more functionalities to Vectors. it could help later. We'll see

export type Frames = {
    max: number;
    currentFrame: number;
    elapsed: number;
    frameDelay: number;
}

export type Offset = {
    ox: number;
    oy: number;
}

export type World = {
    collisions: Array<number>
    triggers: Array<number>
    WORLD_WIDTH: number
    WORLD_HEIGHT: number
    map: HTMLImageElement
    foreground: HTMLImageElement
} //CHECK: make sure to update this if you add things. yikes