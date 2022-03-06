import express from 'express';

const app = express();
app.use(express.static('public', {
    setHeaders: function (res, path) {
        res.set('Cross-Origin-Opener-Policy', 'same-origin');
        res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    }
}));

app.listen(3000, () => {
    console.log('App is available at http://localhost:3000');
});