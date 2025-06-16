let express = require("express");
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
  let newSubs = new Newsletter(req.body);
  newSubs
    .save()
    .then(function (posts) {
      res.send(posts);
    })
    .catch(function (err) {
      res.status(400).send({ message: "Error adding email subscrition!", error: err });
    });
});
