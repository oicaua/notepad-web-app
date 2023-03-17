const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const router = express.Router()
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/';
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());

// ------------------------------

// HTML
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

router.get('/archived.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/archived.html'))
})

router.get('/bin.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/bin.html'))
})

router.get('/createNote.html', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/createNote.html'))
})

// CSS
router.get('/style/index.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/style/index.css'))
})

router.get('/style/body-content.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/style/body-content.css'))
})

router.get('/style/footer.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/style/footer.css'))
})

router.get('/style/header.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/style/header.css'))
})

router.get('/style/side-bar.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/style/side-bar.css'))
})

//JS
router.get('/script/app.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/script/app.js'))
})

router.get('/script/app.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/script/app.js'))
})

app.use('/', router)

// ------------------------------

// Connect to the database
const uri = "mongodb+srv://dbUser:jT7wtWWgNPUTg0Vn@clusterdatabasenotepad.tcbamgl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const client = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
const jsonParser = bodyParser.json()

app.post('/createNotes', jsonParser, (req, res) => {
    client.connect((err) => {
        const db = client.db("user_notes");
        const collection = db.collection("notes");
        collection.insertOne({ title: req.body.title, text: req.body.text, status: req.body.status }, (err, result) => {
            console.log("Title and Text added as: " + req.body.title + "and " + req.body.text);
            client.close();
            res.json({ status: 'success' });
        });
    });
});

// ------------------------------

mongoose.connect("mongodb://localhost/user_notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const notesSchema = new mongoose.Schema({
    id: String,
    title: String,
    text: String,
    status: String
});

const Note = mongoose.model("Note", notesSchema);

app.get("/notes", (req, res) => {
    Note.find({}, (err, notes) => {
        if (err) {
            console.error("Error while retrieving notes:", err);
            res.status(500).send("Error while retrieving notes");
        } else {
            res.json(notes);
        }
    });
});

// ------------------------------

// GET a specific note by ID
router.get('/notes/:id', (req, res) => {
    Note.findById(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send('Note not found');
            }
            res.render('note', { note });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// ------------------------------

// DELETE a specific note by ID
router.delete('/notes/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(note => {
            if (!note) {
                return res.status(404).send('Note not found');
            }
            res.json(note);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// ------------------------------

// PUT to archive a specific note by ID

router.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    let { title, text } = req.body;
    
    if (text && title) {
        Note.findByIdAndUpdate(id, { text, title }, { new: true })
            .then(note => {
                if (!note) {
                    return res.status(404).send('Note not found');
                }
                res.json(note);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Internal Server Error for edits in the text');
            });
    } else {
        Note.findByIdAndUpdate(id, { status: 'archived' }, { new: true })
            .then(note => {
                if (!note) {
                    return res.status(404).send('Note not found');
                }
                res.json(note);
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Internal Server Error for Status changing');
            });
    }
});



// ------------------------------

console.log('Server running fine tho')
app.listen(process.env.port || 3000, () => {
    console.log('Server started on http://localhost:3000');
});
