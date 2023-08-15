import mongoose from 'mongoose'

interface IngredientsInterface extends mongoose.Document {
	name: string
	operation: string
	pizzas: string[]
}

const ingredientsSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
	},
	operation: { type: mongoose.Schema.Types.ObjectId, ref: 'operations' },
	pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pizzas' }]
})


export default mongoose.model<IngredientsInterface>('ingredients', ingredientsSchema)
