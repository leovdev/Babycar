
const express= require('express')
const bodyParser= require('body-parser')
const {User} = require('./bd/sequelizeConn.js')
const sequelize=require('sequelize')
const hbs= require('hbs');
const path = require('path')

var app= express();

const publicDirectoryPath = path.join(__dirname,'public')
const viewsPath= path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/views/partials')

app.set('view engine', hbs);
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(bodyParser.json());

app.post('/users', (req,res)=>{
    User.create(req.body)
    .then(user=>res.json(user))
});

app.get('/users', (req, res) => {
    User.findAll().then((users) =>{
      res.render('index.hbs',{ users,
        welcomeMessage:'Welcome to my website', title: "Título"})
    })
})

//SELECT * FROM users WHERE MONTH(birthday) = 4;


app.get('/date', (req, res) => {
  User.findAll({
    where: {
      mes: "enero",
      mes:"octubre"
    }
  }).then((users) =>{
    res.render('index.hbs',{ users,
      welcomeMessage:'Welcome to my website', title: "Título"})
  })
})


app.listen(3000, ()=>{
  console.log('Started on port 3000');
});

module.exports = {app};
