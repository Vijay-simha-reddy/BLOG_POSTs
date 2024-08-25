const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
require('dotenv').config();  

const app = express();
app.use(cors());
app.use(bodyParser.json());


const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true    
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/', postRoutes); 

app.use((err, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
