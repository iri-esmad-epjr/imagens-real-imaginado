let express = require("express");
let mongoose = require("mongoose");
let path = require('path');
let app = express();

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

app.delete('/newsletter/:id', function (req, res) {
    Newsletter.findByIdAndDelete(req.params.id)
        .then(function (subs) {
            if (subs) {
                res.send({ message: 'Subscriber deleted successfully!' });
            } else {
                res.status(404).send({ message: 'Subscriber not found' });
            }
        })
        .catch(function (err) {
            res.status(500).send({ message: 'Error deleting Subscriber', error: err });
        });
});


// PROGRAMA
app.post("/programa", function (req, res) {
  let { dia, horario, titulo, oradores, linkInscricao } = req.body;

  if (!dia || !horario || !titulo || !oradores) {
    return res.status(400).send({ message: "Campos obrigatórios em falta!" });
  }

  let newEvent = new Programa({ dia, horario, titulo, oradores, linkInscricao });

  newEvent
    .save()
    .then(function (event) {
      res.send(event);
    })
    .catch(function (err) {
      res.status(400).send({ message: "Error adding event!", error: err });
    });
});

app.get("/programa", function (req, res) {
  Programa.find()
    .then(function (event) {
      res.send(event);
    })
    .catch(function (err) {
      res.status(500).send({ message: "Error fetching events!", error: err });
    });
});

app.put("/programa/:id", function (req, res) {
  Programa.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(function (events) {
      if (events) {
        res.send(events);
      } else {
        res.status(404).send({ message: "Event not found!" });
      }
    })
    .catch(function (err) {
      res.status(500).send({ message: "Error updating event!", error: err });
    });
});

app.get('/programa/:id', (req, res) => {
  Programa.findById(req.params.id)
    .then(evento => {
      if (!evento) return res.status(404).send({ message: 'Evento não encontrado' });
      res.send(evento);
    })
    .catch(err => res.status(500).send({ message: 'Erro ao buscar evento', error: err }));
});

app.delete('/programa/:id', function (req, res) {
    Programa.findByIdAndDelete(req.params.id)
        .then(function (event) {
            if (event) {
                res.send({ message: 'Event deleted successfully!' });
            } else {
                res.status(404).send({ message: 'Event not found!' });
            }
        })
        .catch(function (err) {
            res.status(500).send({ message: 'Error deleting event!', error: err });
        });
});

app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});