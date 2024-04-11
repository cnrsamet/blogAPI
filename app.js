const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override');

const path = require('path');

const blogRoute = require('./routes/blogRoute');
const userRoute = require('./routes/userRoute');

const blogController = require('./controllers/blogController');
const userController = require('./controllers/userController');
const Blog = require('./models/Blogs');
const app = express();

mongoose.connect('mongodb://localhost:27017/blogAPI')

app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(
    methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', (req, res) => {
  res.send('Welcome to the blogAPI!');
});

//BLOGS
app.use('/api/blogs', blogRoute);
//USERS
app.use('/api/users', userRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`app starting at http://localhost:${port}`);
});
