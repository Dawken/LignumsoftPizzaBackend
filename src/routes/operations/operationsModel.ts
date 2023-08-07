import mongoose from 'mongoose'

interface OperationsInterface extends mongoose.Document {
    operation: string
    ingredients: string[]
	pizza: string[]
}

const operationsSchema = new mongoose.Schema({
	operation: {
		required: true,
		type: String
	},
	ingredient: {
		type: [String],
	},
	pizza: {
		type: [String]
	}
})

export default mongoose.model<OperationsInterface>('operations', operationsSchema)
