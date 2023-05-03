const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const account = require('./models/account');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

app.use(express.static('./public'));

app.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/login.html'))
})

app.get('/welcome', (req, res, next) => {
    try {
        if (jwt.verify(req.cookies.token, 'shhh'))
            next();
    }
    catch (err) {
        return res.redirect('/login');
    }

}, (req, res, next) => {
    res.sendFile(path.join(__dirname, './views/welcome.html'))
})


app.post('/login', (req, res, next) => {
    account.findOne(
        {
            username: req.body.username,
            password: req.body.password
        }
    )
        .then(data => {
            if (data) {
                var idAcc = data._id.toString()
                var token = jwt.sign({
                    id: idAcc
                }, 'shhh', {
                    expiresIn: '1h'
                })

                res.json({
                    message: 'Đăng nhập thành công',
                    token: token
                })
            }
            else
                return res.json('Đăng nhập thất bại')
        })
})

app.listen(3000);