const express = require('express');
const app = express();
const port = 8000;
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
})

const mongoDb = require('./db');

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies 

app.get('/', (req,res) => {
    res.send('Hello world')
})

// create api middeleware
app.use('/api/',require('./routes/CreateUser'))
app.use('/api/',require('./routes/DisplayData'))
app.use('/api/',require('./routes/OrderData'))

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})




