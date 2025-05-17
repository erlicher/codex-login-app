const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Fake user
const USER = { username: 'user', password: 'pass' };

// Routes
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/main');
    } else {
        res.render('login');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USER.username && password === USER.password) {
        req.session.loggedIn = true;
        res.redirect('/main');
    } else {
        res.send('Invalid credentials. <a href="/">Try again</a>.');
    }
});

app.get('/main', (req, res) => {
    if (req.session.loggedIn) {
        res.render('main');
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});