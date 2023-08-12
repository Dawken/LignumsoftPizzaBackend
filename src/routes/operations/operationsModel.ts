import mongoose from 'mongoose'

interface OperationsInterface extends mongoose.Document {
    operationName: string
    ingredients: string[]
	pizzas: string[]
}

const operationsSchema = new mongoose.Schema({
	operationName: {
		required: true,
		type: String
	},
	ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredients' }],
	pizzas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pizzas' }]
})

export default mongoose.model<OperationsInterface>('operations', operationsSchema)
