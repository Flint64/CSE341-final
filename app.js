const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
// const flash = require('connect-flash');
//FIXME
//TODO: Create error controller
// const errorController = require('./controllers/error');

//Todo

//TODO: Set up correct database URI
// const MONGODB_URI = 'mongodb+srv://hego64:O2td48l7fmUUtMrp@cluster0.cgnnu.mongodb.net/shop';
const PORT = process.env.PORT || 3000;

//TODO: Handle sessions
const app = express();
// const store = new MongoDBStore({
//   uri: MONGODB_URI,
//   collection: 'sessions'
// });

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

//TODO: Create and add routes
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//   })
// );

// app.use(csrfProtection);
// app.use(flash());

app.use((req, res, next) => {
    //TODO: Set up this middleware for easy authentication verification
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   res.locals.csrfToken = req.csrfToken();
  next();
});

// app.use((req, res, next) => {
//   if (!req.session.user) {
//     return next();
//   }
//   User.findById(req.session.user._id)
//     .then(user => {
//       if (!user){
//         return next();
//       }
//       req.user = user;
//       next();
//     })
//     .catch(err => {
//       // throw new Error(err);
//       next(new Error(err));
//     }); 
// });

//TODO: Create and use routes
// app.use('/admin', adminRoutes);
// app.use(shopRoutes);
// app.use(authRoutes);


//TODO: Create error controller
// app.get('/500', errorController.get500);
// app.use(errorController.get404);

// app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
//   console.log(error);
//   res.status(500).render('500', {
    // pageTitle: 'Error!',
    // path: '/500',
    // isAuthenticated: req.session.isLoggedIn
//   });
// });

app.get('/', (req, res, next) => {
    // This is the primary index, always handled last. 
    res.render('index');
  })



app.listen(PORT);

//TODO: Set up correct mongodb URI
// mongoose.connect(MONGODB_URI)
// .then(result => {
//   app.listen(PORT);
// })
// .catch(err => {
//   console.log(err);
// });