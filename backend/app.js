const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3001;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const commentsRouter = require('./routes/comments');
const hashTagRouter = require('./routes/hashTags')


app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/comments', commentsRouter);
app.use('/hashtags', hashTagRouter);

app.listen(port, () => console.log("Server running on port ", port));

