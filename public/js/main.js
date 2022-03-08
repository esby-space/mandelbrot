"use strict";
// VIEW and COLOR //
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
// MAIN //
const main = async () => {
    render(view, color);
    canvas.onclick = (event) => {
        const relX = event.offsetX / width - 0.5;
        const moveX = (view.r.end - view.r.start) * relX;
        const relY = event.offsetY / height - 0.5;
        const moveY = (view.i.end - view.i.start) * relY;
        view.r.start += moveX;
        view.r.end += moveX;
        view.i.start += moveY;
        view.i.end += moveY;
        render(view, color);
    };
    document.body.onkeydown = (event) => {
        if (event.key == '-') {
            view.r.start *= 2;
            view.r.end *= 2;
            view.i.start *= 2;
            view.i.end *= 2;
        }
        else if (event.key == '=') {
            view.r.start /= 2;
            view.r.end /= 2;
            view.i.start /= 2;
            view.i.end /= 2;
        }
        render(view, color);
    };
};
const render = async (view, color) => {
    const start = performance.now();
    const buffer = new SharedArrayBuffer(width * height * 4);
    const data = new Uint8ClampedArray(buffer);
    for (let i = 0; i < threads; i++) {
        workers = [...workers, new Worker('./js/worker.js')];
    }
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
            worker.terminate();
            if (done == threads) {
                const finalData = Uint8ClampedArray.from([...data]);
                const image = new ImageData(finalData, width, height);
                context.clearRect(0, 0, width, height);
                context.imageSmoothingEnabled = false;
                context.putImageData(image, 0, 0);
                workers = [];
                const end = performance.now();
                console.log(`Time to render: ${end - start} ms`);
            }
        };
    }
};
window.addEventListener('load', main);
