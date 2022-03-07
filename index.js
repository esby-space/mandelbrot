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

const PORT = process.env.PORT || 3000;
app.set('port', PORT);
app.listen(PORT, () => {
    console.log(`App is available at http://localhost:${PORT}`);
});
