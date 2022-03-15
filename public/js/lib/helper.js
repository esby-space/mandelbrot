"use strict";
// MATH //
const mix = (min, value, max) => {
    return value * (max - min) + min;
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
        return Math.sqrt(this.r ** 2 + this.i ** 2);
    }
    add(complex) {
        this.r += complex.r;
        this.i += complex.i;
        return this;
    }
    square() {
        const real = (this.r + this.i) * (this.r - this.i);
        const imaginary = 2 * this.r * this.i;
        this.r = real;
        this.i = imaginary;
        return this;
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
const paintPixel = (data, width, x, y, rgba) => {
    const i = 4 * (y * width + x);
    data[i] = rgba.r; // red
    data[i + 1] = rgba.g; // green
    data[i + 2] = rgba.b; // blue
    data[i + 3] = rgba.a; // alpha
};
// OTHER //
/** Synchronous pause */
const sleep = async (time) => {
    await new Promise((r) => setTimeout(r, time));
};
// /\__/\
// (=o.o=)
// |/--\|
// (")-(")
