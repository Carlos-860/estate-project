import express from 'express';

const app = express(); // creates an application

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})