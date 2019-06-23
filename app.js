const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const helper = require('./controllers/Sys');
const request = require('request');

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({
    extended: false
}));

app.get('', async (req, res) => {
    const coord = {'lat': 47.591180, 'lon': -122.332700};
    // const address = await helper.getCoordFromAddress(coord);
    // res.send(address);
    //const address = '155 yorkville avenue, toronto';
    //const coord = await helper.getAddressFromCoord(address);
    //res.send(coord);
    const coord2 = {'lat': 47.111, 'lon': -111};
    res.send('good');
});

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));