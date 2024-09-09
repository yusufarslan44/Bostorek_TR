const express = require('express');
const connectDB = require('./config/db');
const bookRoute = require('./routes/bookRoute');
const authRoute = require('./routes/authRoute')
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json())

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true
}
app.use(cors(corsOptions))

app.use('/api/v1/books', bookRoute)
app.use('/api/v1/auth', authRoute)

try {
    connectDB();
    app.listen(port, () => {
        console.log(`Server is listening port:${port}`);
    })
} catch (error) {
    process.exit(1)
}


