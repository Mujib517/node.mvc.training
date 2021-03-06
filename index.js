//ES6
const express = require('express'); //block scoped. funciton scoped
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const config = require('./utilities/config');
const bodyParser = require('body-parser');
const middlewares = require('./utilities/middlewares');
const jade = require('jade');

const app = express();

const port = process.env.PORT || 3000;

function add(a, b) {
    return a + b;
}

app.listen(port, () => console.log(`Server is running on ${port}`));

mongoose.connect(config.conStr, () => console.log("Connected"));

app.use(express.static('lib'));
app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'jade');
app.set('views', __dirname + "/public");

// app.set('view engine', 'hbs');
// app.engine('hbs', hbs.express4({
//     defaultLayout: __dirname + "/views/index.hbs",
//     partialsDir: __dirname + "/views/partials/"
// }));

const configureAuth = require('./utilities/auth');

const passport = require('passport');
configureAuth(app);

const defaultRouter = require('./routes/default.router');
const bookRouter = require('./routes/book.router');
const userRouter = require('./routes/user.router');

app.use('/', defaultRouter);
app.use('/users', userRouter);

// app.use(middlewares.isAuthenticated);
// app.use(middlewares.attachAuthInfo);
// app.use(middlewares.noCache);

app.use('/books', bookRouter);