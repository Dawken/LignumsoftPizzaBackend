import mongoose from 'mongoose'

interface OperationsInterface extends mongoose.Document {
	name: string
    ingredients: string[]
	pizzas: string[]
}

const operationsSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredients' }],
	pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pizzas' }]
})

export default mongoose.model<OperationsInterface>('operations', operationsSchema)
