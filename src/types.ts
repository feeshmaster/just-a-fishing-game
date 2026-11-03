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