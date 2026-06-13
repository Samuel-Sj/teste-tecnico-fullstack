const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');

const app = express()

app.use(cors())
app.use(express.json());
app.use('/api',userRoutes)

const PORT = 3000;

app.listen(PORT, () =>
console.log("Running")
);