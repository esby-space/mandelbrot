# mandelbrot!

![mandelbrot!](images/mandelbrot.png)

## this is my attempt to implement the mandelbrot set using html canvas, it is _really_ inefficient!

-   written in typescript, under `scripts/main.ts`
-   uses html canvas to upload and render
-   works best in google chrome, though firefox and safari work too
    -   on my machine, it takes about 2 - 5 seconds to load fully
-   v3 needed sharedArrayBuffer, so i had to build a quick express server and can't show on gh pages :(

## why?

-   bc i here that's what the cs students do
-   bc i like math (help me)
-   bc its pretty :)

## peformance thingy

| version | chrome | firefox |
| ------- | ------ | ------- |
| 1       | 1,363  | 3,292   |
| 2       | 733    | 992     |
| 3       | 287    | 233     |