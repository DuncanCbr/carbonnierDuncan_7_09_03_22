const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');
const postRouter = require('./routes/Posts')
const commentsRouter = require('./routes/Comments')
const usersRouter = require('./routes/Users')


app.use(express.json());
app.use(cors());

app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);


db.sequelize.sync().then(() => {
    app.listen(3002, () =>{ 
        console.log("server running on port 3002");
    });
});