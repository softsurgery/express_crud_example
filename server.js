const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Error...', err);
    process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({"message": "Server is running :D"});
});

require('./routes/user.routes.js')(app);
require('./routes/note.routes.js')(app);
const PORT = process.env.PORT || 3000; // Utilisez 3001 ou un autre port
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

