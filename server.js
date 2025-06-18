/*let express = require("express");
let mongoose = require("mongoose");
let app = express();

app.use(express.json());
app.use(express.static("public"));

//CONNECTION TO MONGODB
const uri = 
'mongodb+srv://admin:admin123@cluster0.su33qyu.mongodb.net/newsletterDB'
mongoose.connect(uri);

//SCHEMA FOR NEWSLETTER SUBS
const newsletterSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true,},
    subscribedAt: {type: Date, default: Date.now,}
});

const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

//ENDPOINTS
app.newsletter("/newsletter", function (req, res) {
  let newSubs = new Posts(req.body);
  newPosts
    .save()
    .then(function (posts) {
      res.send(posts);
    })
    .catch(function (err) {
      res.status(400).send({ message: "Error adding posts", error: err });
    });
});*/

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const uri = "mongodb+srv://admin:admin123@cluster0.su33qyu.mongodb.net/iriDB";

mongoose
  .connect(uri)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.log("Error connecting to MongoDB", err);
  });


/* MODEL NEWSLETTER */
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  },
{ versionKey: false });

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

/* MODEL PROGRAMA */
const programaSchema = new mongoose.Schema({
  dia: { type: String, required: true },            
  horario: { type: String, required: true },       
  titulo: { type: String, required: true },        
  oradores: { type: String, required: true },      
  linkInscricao: { type: String, default: "" },     
}, { versionKey: false });

const Programa = mongoose.model("Programa", programaSchema);

// ROTAS

//add email newsletter
app.post("/newsletter", function (req, res) {
  let newSubs = new Newsletter(req.body);
  newSubs
    .save()
    .then(function (subs) {
      res.send(subs);
    })
    .catch(function (err) {
      res.status(400).send({ message: "Error adding subscriber!", error: err });
    });
});

app.get("/newsletter", function (req, res) {
  Newsletter.find()
    .then(function (subs) {
      res.send(subs);
    })
    .catch(function (err) {
      res.status(500).send({ message: "Error fetching subscribers!", error: err });
    });
});
