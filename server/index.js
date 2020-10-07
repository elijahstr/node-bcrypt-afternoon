require('dotenv').config();
const express = require('express'),
 massive = require('massive'),
 session = require('express-session'),
 app = express(),
 PORT = 4001,
 authCtrl = require('./controllers/authController'),
 treasureCtrl = require('./controllers/treasureController'),
 auth = require('./middleware/authMiddleware')

const {CONNECTION_STRING, SESSION_SECRET} = process.env;
app.use(express.json());

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then((db)=>{
    app.set('db', db);
    console.log('database connected');
})
.catch(err => console.log(err));

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);


app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure);
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure);
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure);
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure);

 app.listen(PORT, () => console.log(`Server is running on ${PORT}`));