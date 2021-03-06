require('dotenv').config();
const express = require(`express`);
const app = express();
// const port = process.env.PORT || 4000;

const routes = require(`./routes/index.router`);

//parsing json format
app.use(express.json())
app.use(express.urlencoded( { extended : true } ))


//Router
app.use(`${process.env.BASE_URL}`, routes);

// Run app on port
// app.listen(port, () => {
//     console.log(`Halo, saya bernama server, saya mendengarkan di port ${port}`)
// })

module.exports = app;