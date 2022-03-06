"use strict";
// VIEW //
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
// CANVAS //
const canvas = createSimulation(container);
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
// WORKERS //
let workers = [];
const threads = 4;
for (let i = 0; i < threads; i++) {
    workers = [...workers, new Worker('./js/worker.js')];
}
// MAIN //
const main = async () => {
    const start = performance.now();
    const buffer = new SharedArrayBuffer(width * height * 4);
    const data = new Uint8ClampedArray(buffer);
    let done = 0;
    for (let [i, worker] of workers.entries()) {
        const parameters = {
            width,
            height,
            data,
            view,
            color,
            threads,
            i,
        };
        worker.postMessage(parameters);
        worker.onmessage = () => {
            done++;
            if (done == threads) {
                const finalData = Uint8ClampedArray.from([...data]);
                const image = new ImageData(finalData, width, height);
                context.imageSmoothingEnabled = false;
                context.putImageData(image, 0, 0);
                const end = performance.now();
                console.log(`Time to render: ${end - start} ms`);
            }
        };
    }
};
window.addEventListener('load', main);
