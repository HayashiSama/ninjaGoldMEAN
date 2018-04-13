// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.use(express.static( __dirname + '/ninjaGoldAngular/dist' ));


var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ninjagold');

var NinjaSchema = new mongoose.Schema({
    gold: {type: Number, default: 0},
    description: {type: Array, default: []},
}, {timestamps: true });


mongoose.model('Ninja', NinjaSchema); // We are setting this Schema in our Models as 'User'
var Ninja = mongoose.model('Ninja'); // We are retrieving this Schema from our Models, named 'User'

app.get('/newninja', function(req, res){
    var newNinja = new Ninja()
    console.log("New Ninja")
    newNinja.save(function (err){
        if(err){
            res.json({message:"error", error: err})
        }
        else{
            res.json({message: newNinja._id})
        }
    })
})


app.get('/location/:id/:location', function(req, res) {
    //2 to 5
    console.log("in server")
    var randomAmount;
    if(req.params.location == "farm"){
        randomAmount = Math.floor(Math.random()*4) + 2
    }
    else if(req.params.location == "cave"){
        randomAmount = Math.floor(Math.random()*6) + 5
    }
    else if(req.params.location == "house"){
        randomAmount = Math.floor(Math.random()*9) + 7
    }
    else if(req.params.location == "casino"){
        randomAmount = Math.floor((Math.random() - 0.5)*100)
    }
    var gainlost = (randomAmount>0 ? " and got " : " and lost ")
   


    Ninja.findOne({_id: req.params.id}, function(err, ninja) {
        ninja.gold += randomAmount
        ninja.description.push("Went to " + req.params.location + gainlost + randomAmount + " Gold")
        ninja.save(function(err){
            if(err){
                res.json({message: "ERROR IN location"})
            }
            else{
                res.json({gold: ninja.gold, description: ninja.description })
            }
       })
           
    })

})



//cave 5-10
//house 7-15
//casino -100 - 100





// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})