import mongoose from 'mongoose'

interface PizzasInterface extends mongoose.Document {
    pizza: string
    operation: string[]
    ingredients: string[]
}

const pizzasSchema = new mongoose.Schema({
	pizza: {
		required: true,
		type: String
	},
	ingredient: {
		type: [String],
	},
	operation: {
		type: [String]
	}
})

export default mongoose.model<PizzasInterface>('pizzas', pizzasSchema)
