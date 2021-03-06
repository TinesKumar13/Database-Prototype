require('dotenv').config()
const express = require ('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require ("mongoose")
const cors = require("cors")


app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())


//DB CONNECTIONS
mongoose.connect(process.env.DATABASE || 'mongodb+srv://devTines:tiaga13599@cluster0.f2wvr.mongodb.net/sare?retryWrites=true&w=majority',{
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



const PORT = process.env.PORT || 8000



//How to start listen to server
app.listen(PORT)


