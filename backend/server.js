const express = require('express');
const connectDB = require('./config/db');
const bookRoute = require('./routes/bookRoute');
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2

const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json())
app.use(fileUpload({ useTempFiles: true }))

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true
}
app.use(cors(corsOptions))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})



app.use('/api/v1/books', bookRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)

try {
    connectDB();
    app.listen(port, () => {
        console.log(`Server is listening port:${port}`);
    })
} catch (error) {
    process.exit(1)
}


