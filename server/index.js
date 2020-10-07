require('dotenv').config();
const express = require('express'),
 massive = require('massive'),
 session = require('express-session'),
 app = express(),
 PORT = 4001,
 authCtrl = require('./controllers/authController');

const {CONNECTION_STRING, SESSION_SECRET} = process.env;
app.use(express.json());

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then((db)=>{
    app.set('db', db);
    console.log('database connected');
})
.catch(err => console.log(err));

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}));

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout)


 app.listen(PORT, () => console.log(`Server is running on ${PORT}`));