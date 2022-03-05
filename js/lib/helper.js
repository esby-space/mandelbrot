"use strict";
// MOUSE //
const Mouse = {
    x: 0,
    y: 0,
    pressed: false,
};
document.body.onmousemove = (event) => {
    Mouse.x = event.pageX;
    Mouse.y = event.pageY;
};
document.body.onmousedown = () => {
    Mouse.pressed = true;
};
document.body.onmouseup = () => {
    Mouse.pressed = false;
};
// MATH //
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};
const pythag = (x, y) => {
    return Math.sqrt(x ** 2 + y ** 2);
};
const mix = (min, value, max) => {
    return value * (max - min) + min;
};
/** Implementation of vectors */
class Vector {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    get magnitude() {
        return pythag(this.x, this.y);
    }
    toAngle() {
        return Math.atan2(this.y, this.x);
    }
    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }
    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
    divide(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }
    normalize(magnitude = 1) {
        return this.magnitude == 0
            ? new Vector()
            : this.multiply(magnitude / this.magnitude);
    }
    min(min = 1) {
        return this.magnitude < min ? this.normalize(min) : this;
    }
    max(max = 1) {
        return this.magnitude > max ? this.normalize(max) : this;
    }
    clamp(min, max) {
        if (this.magnitude > max)
            return this.normalize(max);
        if (this.magnitude < min)
            return this.normalize(min);
        return this;
    }
    static average(...vectors) {
        const count = vectors.length;
        if (count == 0)
            return new Vector();
        const total = vectors.reduce((acc, cur) => acc.add(cur));
        return total.divide(count);
    }
}
/** Turn an angle in a vector */
const toVector = function (number) {
    return new Vector(Math.cos(number), Math.sin(number));
};
/** Implementation of complex numbers */
class Complex {
    r;
    i;
    constructor(real, imaginary) {
        this.r = real;
        this.i = imaginary;
    }
    get magnitude() {
        return pythag(this.r, this.i);
    }
    add(complex) {
        return new Complex(this.r + complex.r, this.i + complex.i);
    }
    multiply(complex) {
        const real = this.r * complex.r - this.i * complex.i;
        const imaginary = this.r * complex.i + this.i * complex.r;
        return new Complex(real, imaginary);
    }
    power(exponent) {
        let out = new Complex(1, 0);
        for (let i = 0; i < exponent; i++) {
            out = out.multiply(this);
        }
        return out;
    }
}
// HTML CANVAS //
/** Makes a canvas element to a certain width and height */
const createCanvas = (width, height, hd = false) => {
    const canvas = document.createElement('canvas');
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
    if (hd)
        canvas.width *= window.devicePixelRatio;
    if (hd)
        canvas.width *= window.devicePixelRatio;
    return canvas;
};
/** Makes and appends a canvas element to a container */
const createSimulation = (container, hd = false) => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const canvas = createCanvas(width, height, hd);
    container.append(canvas);
    return canvas;
};
/** Image Manipulation */
class RGBA {
    r;
    g;
    b;
    a;
    constructor(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
const black = new RGBA(0, 0, 0);
const white = new RGBA(255, 255, 255);
const paintPixel = (image, x, y, rgba) => {
    const i = 4 * (y * image.width + x);
    image.data[i] = rgba.r; // red
    image.data[i + 1] = rgba.g; // green
    image.data[i + 2] = rgba.b; // blue
    image.data[i + 3] = rgba.a; // alpha
};
const toRGBA = (h, s, l, a = 1) => {
    let r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    }
    else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = Math.round(hueToRGB(p, q, h + 1 / 3) * 255);
        g = Math.round(hueToRGB(p, q, h) * 255);
        b = Math.round(hueToRGB(p, q, h - 1 / 3) * 255);
    }
    return { r, g, b, a };
};
const hueToRGB = (p, q, t) => {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
};
// SPRITES //
/** Loads an image from a path */
const loadImage = async (src) => {
    const image = new Image();
    image.src = src;
    await image.decode();
    return image;
};
/** Loads multiple images and labels them */
const loadImages = async (input) => {
    const promises = Object.values(input).map(loadImage);
    const images = await Promise.all(promises);
    const out = {};
    for (let [i, name] of Object.keys(input).entries()) {
        out[name] = images[i];
    }
    return out;
};
// OTHER //
/** Synchronous pause */
const sleep = async (time) => {
    await new Promise((r) => setTimeout(r, time));
};
