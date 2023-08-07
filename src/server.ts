import { config } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import ingredients from './routes/ingredients/ingredients.routes'
import operations from './routes/operations/operations.routes'
import pizzas from './routes/pizzas/pizzas.routes'

config()
const app = express()

const mongoConnectionString = process.env.MONGO_CONNECTED_STRING

mongoose.connect(mongoConnectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})

const database = mongoose.connection

database.on('error', (error) => {
	console.log(error)
})

database.once('connected', () => {
	console.log('Database Connected')
})

app.set('Access-Control-Allow-Credentials', true)
app.use(express.json())
app.use(ingredients)
app.use(operations)
app.use(pizzas)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`)
})
