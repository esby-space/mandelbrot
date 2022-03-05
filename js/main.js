"use strict";
const container = document.querySelector('#container');
const view = {
    r: {
        start: -2,
        end: 2,
    },
    i: {
        start: -2,
        end: 2,
    },
};
container.style.aspectRatio = `${(view.r.end - view.r.start) / (view.i.end - view.i.start)}`;
const color = new RGBA(50, 8, 25);
const canvas = createSimulation(container);
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const main = () => {
    const start = performance.now();
    const image = context.createImageData(width, height);
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const real = mix(view.r.start, i / width, view.r.end);
            const imaginary = mix(view.i.start, j / height, view.i.end);
            const complex = new Complex(real, imaginary);
            const count = mandlebrot(complex, new Complex(0, 0));
            paintPixel(image, i, j, new RGBA(color.r * count, color.g * count, color.b * count));
        }
    }
    context.imageSmoothingEnabled = false;
    context.putImageData(image, 0, 0);
    const end = performance.now();
    console.log(`Time to render: ${end - start} ms`);
};
const mandlebrot = (c, z, count = 0) => {
    z.multiply(z).add(c);
    if (z.magnitude > 2)
        return count;
    if (count > 255)
        return 0;
    return mandlebrot(c, z, count + 1);
};
window.addEventListener('load', main);
