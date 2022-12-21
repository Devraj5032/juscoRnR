require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require("path");
const listRoute = require('./routes/qna_list')
const customerRoute = require('./routes/customer')
const userRoute = require('./routes/user')
const errorHandler = require('./middleware/errorMiddleware')


const app = express()

//middlewares
// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())


//routes
app.use('/api',listRoute)
app.use('/api',customerRoute)
app.use('/api',userRoute)


app.use(errorHandler)

const port = process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`listening on port:${port}`)
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
});