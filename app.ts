import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import routes from './src/routes'

const app = express()

app.disable('x-powered-by');

//middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(helmet())

//routes
app.use('/v1', routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running on http://localhost:${port}`)
})