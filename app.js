const express = require('express');
const cors=require('cors');
const userRouter=require('./routers/userRouter')
const eventRouter=require('./routers/eventRouter');
// cross origin resource sharing.

const app =express();

app.use(cors());
app.use(express.json());

app.use('/user',userRouter);
app.use('/event',eventRouter);

module.exports=app;
