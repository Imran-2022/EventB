const express = require('express');
const cors=require('cors');
const userRouter=require('./routers/userRouter')
const eventRouter=require('./routers/eventRouter');
// cross origin resource sharing.

const app =express();

// Configure CORS
const corsOptions = {
    origin: 'https://eventm0.netlify.app', // Change this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // Allow credentials if needed
  };
  
app.use(cors(corsOptions));


app.use(express.json());

app.use('/user',userRouter);
app.use('/event',eventRouter);

module.exports=app;
