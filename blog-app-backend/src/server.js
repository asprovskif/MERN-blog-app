import express from 'express';
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())

app.get('/hello',(req, res) => {
    res.send('Hello World')
});


app.post('/hello', (req, res) => {
    const name = req.body.name;
    res.send(`Hello there ${name}`)
})


app.listen(8000, () => {
    console.log('App is listening on port 8000')
})