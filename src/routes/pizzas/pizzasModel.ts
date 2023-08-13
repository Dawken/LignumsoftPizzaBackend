import mongoose from 'mongoose'

interface PizzasInterface extends mongoose.Document {
    name: string
    operations: string[]
    ingredients: string[]
}

const pizzasSchema = new mongoose.Schema({
	name: String,
	operations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'operations' }],
	ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredients' }]
})

export default mongoose.model<PizzasInterface>('pizzas', pizzasSchema)
