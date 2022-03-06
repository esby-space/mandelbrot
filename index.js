import express from 'express';
import { readFile } from 'fs/promises';

const app = express();
app.use(
    express.static('public', {
        setHeaders: (response, path) => {
            response.set('Cross-Origin-Opener-Policy', 'same-origin');
            response.set('Cross-Origin-Embedder-Policy', 'require-corp');
        },
    })
);

app.get('/', async (request, response) => {
    const home = await readFile('./public/index.html', 'utf-8').catch(
        (error) => {
            response.send(error);
            response.status(400);
        }
    );

    response.send(home);
    response.status(200);
    console.log('hello there!');
});

app.listen(3000, () => {
    console.log('App is available at http://localhost:3000');
});
