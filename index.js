const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('OK');
});

app.get('/status', (req, res) => {
    res.json({ status: 'OK' });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});