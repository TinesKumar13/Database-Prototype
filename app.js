require('dotenv').config()
const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require ("mongoose")
const cors = require("cors")
const path = require('path')

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())


//DB CONNECTIONS
mongoose.connect(process.env.DATABASE ,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex: true,
}).then(() => {
    console.log("DB CONNECTED")
}).catch((err) => {
    console.log("Connection Error")
})

//Import Routes

const postsRoute = require('./routes/posts')
const authRoute = require('./routes/auth')

app.use("/api", postsRoute)
app.use("/api/user", authRoute)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build' , 'index.html'));
    })
}


const PORT = process.env.PORT || 8000



//How to start listen to server
app.listen(PORT)


