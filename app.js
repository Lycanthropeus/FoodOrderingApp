const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

/* middleware */
const postsRoute = require('./routes/posts');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/posts',postsRoute);

/* routes */
app.get('/',(req,res)=> {
    res.send('Home');
});

/* initiate connection */
mongoose.connect(process.env.DB_CONNECT_ALIAS,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>(console.log("Connected")));

/* Open port */
app.listen(3000);