const express = require('express');
//dev configs wouldn't use for prod env
const connectDB = require('./config/db');


const app = express();

connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({message: 'welcome 2u web server'}));



//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));