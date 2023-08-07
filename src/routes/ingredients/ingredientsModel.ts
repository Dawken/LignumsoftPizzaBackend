import mongoose from 'mongoose'

interface IngredientsInterface extends mongoose.Document {
	ingredient: string
	operation: string
	pizza: string[]
}

const ingredientsSchema = new mongoose.Schema({
	ingredient: {
		required: true,
		type: String,
	},
	operation: {
		type: String
	},
	pizza: {
		required: true,
		type: [String]
	}
})

export default mongoose.model<IngredientsInterface>('ingredients', ingredientsSchema)
