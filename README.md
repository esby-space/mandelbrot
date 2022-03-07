# [mandelbrot!](https://esby-mandelbrot.herokuapp.com/)

![mandelbrot!](/public/images/mandelbrot.png)

## this is my attempt to implement the mandelbrot on the web!
**it is *really* inefficient!**

-   written in typescript, under `scripts/main.ts`
-   uses html canvas to upload and render
-   works best in google chrome, though firefox and safari work too
    -   on my machine, it takes about 2 - 5 seconds to load fully
-   v3 needed sharedArrayBuffer, so i had to build a quick express server, which is great bc i don't know express :(

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