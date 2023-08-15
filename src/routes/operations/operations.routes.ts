import { Router } from 'express'
import { bodyValidator } from '../../shared/bodyValidator'
import { OperationDTO } from './operationsDTO'
import Operation from './operationsModel'
import Ingredient from '../ingredients/ingredientsModel'
import Pizza from '../pizzas/pizzasModel'

const operations = Router()

operations.get('/api/operations/:id', async (req, res) => {
	try {
		const { populate } = req.query

		const fieldsToPopulate = typeof populate === 'string' ? populate.split(',') : []

		const data = await Operation.findById(req.params.id)
			.populate(fieldsToPopulate)
			.exec()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

operations.get('/api/operations', async (req, res) => {
	try {
		const { populate } = req.query

		const fieldsToPopulate = typeof populate === 'string' ? populate.split(',') : []

		const data = await Operation.find()
			.populate(fieldsToPopulate)
			.exec()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

operations.post('/api/operations', async (req, res) => {
	try {
		await bodyValidator(OperationDTO, req.body)

		const newOperation = new Operation({
			name: req.body.name,
			ingredients: req.body.ingredients,
			pizzas: req.body.pizzas
		})

		const savedOperation = await newOperation.save()

		if (req.body.pizzas && req.body.pizzas.length > 0) {
			await Pizza.updateMany(
				{ _id: { $in: req.body.pizzas } },
				{ $addToSet: { operations: savedOperation._id } }
			)
		}

		if (req.body.ingredients && req.body.ingredients.length > 0) {
			await Ingredient.updateMany(
				{ _id: { $in: req.body.ingredients } },
				{ $addToSet: { operations: savedOperation._id } }
			)
		}

		res.status(201).json(savedOperation)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

operations.patch('/api/operations/:id', async (req, res) => {
	const { id } = req.params
	const updatedData = req.body

	try {
		await bodyValidator(OperationDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}

	try {
		const operation = await Operation.findById(id)

		if (!operation) {
			return res.status(404).json({ message: 'Operation not found' })
		}

		const previousPizzas = operation.pizzas
		const previousIngredients = operation.ingredients

		const updatedOperation = await Operation.findByIdAndUpdate(id, updatedData, { new: true })

		if (
			updatedData.pizzas &&
			JSON.stringify(previousPizzas) !== JSON.stringify(updatedData.pizzas)
		) {
			await Pizza.updateMany(
				{ _id: { $in: previousPizzas } },
				{ $pull: { operations: updatedOperation._id } }
			)

			await Pizza.updateMany(
				{ _id: { $in: updatedData.pizzas } },
				{ $addToSet: { operations: updatedOperation._id } }
			)
		}

		if (
			updatedData.ingredients &&
			JSON.stringify(previousIngredients) !== JSON.stringify(updatedData.ingredients)
		) {
			await Ingredient.updateMany(
				{ _id: { $in: previousIngredients } },
				{ $pull: { operations: updatedOperation._id } }
			)

			await Ingredient.updateMany(
				{ _id: { $in: updatedData.ingredients } },
				{ $addToSet: { operations: updatedOperation._id } }
			)
		}

		res.status(200).json(updatedOperation)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
operations.delete('/api/operations/:id', async (req, res) => {
	const { id } = req.params

	try {
		const deletedOperation = await Operation.findByIdAndRemove(id)

		if (!deletedOperation) {
			return res.status(404).json({ message: 'Operation not found' })
		}
		await Pizza.updateMany(
			{ operations: id },
			{ $pull: { operations: id } }
		)

		await Ingredient.updateMany(
			{ operations: id },
			{ $pull: { operations: id } }
		)

		res.status(200).json({ message: 'Operation deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
export default operations
