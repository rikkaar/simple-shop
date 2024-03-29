require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const router = require('./routes/index')
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://127.0.0.1:5173"
}))
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.get('/', (req, res) => {
    res.send('hello world')
})
app.use('/api', router)

app.use(ErrorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        // await sequelize.sync({ force: true })
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e.message)
    }
}

start()