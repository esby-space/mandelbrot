onmessage = (message) => {
    importScripts('./lib/helper.js');
    let { width, height, data, view, color, threads, i } = message.data;

    while (i < width) {
        for (let j = 0; j < height; j++) {
            const real = mix(view.r.start, i / width, view.r.end);
            const imaginary = mix(view.i.start, j / height, view.i.end);
            const complex = new Complex(real, imaginary);

            const count = mandlebrot(complex, new Complex(0, 0));
            paintPixel(
                data,
                width,
                i,
                j,
                new RGBA(color.r * count, color.g * count, color.b * count)
            );
        }
        i += threads;
    }

    postMessage('done!');
};

const mandlebrot = (c: Complex, z: Complex): number => {
    let count = 0;
    while (z.magnitude < 2 && count < 255) {
        z.square().add(c);
        count++;
    }

    if (count == 255) return 0;
    return count - 1;
};

// /\__/\
// (=o.o=)
// |/--\|
// (")-(")
