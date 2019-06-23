const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const helper = require('./controllers/helper');
const request = require('request');
const axios = require('axios');

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({
    extended: false
}));

/*app.get('', async (req, res) => {
    const address = '155 yorkville avenue, toronto';
    const coord = helper.kylesAttempt(address);
    res.json(coord); 
});*/

app.get('/', async (req, res) => {
    //const url = 'https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=1Vm1u-zCop81CKzExeI8PQvZSbqfgzQ1Q11njb8uyxY&query=155 yorkville avenue, toronto'
    const url = "https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=1Vm1u-zCop81CKzExeI8PQvZSbqfgzQ1Q11njb8uyxY&query=155 yorkville avenue, toronto"
    
    try {
        console.log('req sent');
        const resp = await axios.get(url);
        console.log('req complete');

        res.json(resp);
    } catch (err) {
        res.send('didnt work');
    }
})

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));