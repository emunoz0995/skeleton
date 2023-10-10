const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./utils/databese');
const app = express();
const initModels = require('./models/init.models');
const authRoutes = require('./routes/auth.routes');
const transporter = require('./utils/mailer');

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

initModels();

db.authenticate()
.then(() => console.log('base de datos autenticada'))
.catch((error) => console.log(error));

db.sync({force: true})
.then(() => console.log('Base de datos sincronizada'))
.catch((error) => console.log(error));


// transporter.verify()
// .then(() => {
//     console.log('transporter is ok')
// })
// .catch((error) => console.log(error))

app.get ('/', (req, res) => {
 res.json({message: 'Welcome to my server'});
});

app.use('/api/v1/auth', authRoutes);

module.exports = app;