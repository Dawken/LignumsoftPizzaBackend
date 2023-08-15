import { Router } from 'express'
import { bodyValidator } from '../../shared/bodyValidator'
import { PizzaDTO } from './pizzasDTO'
import Pizza from './pizzasModel'
import Ingredient from '../ingredients/ingredientsModel'
import Operation from '../operations/operationsModel'


const pizzas = Router()

pizzas.get('/api/pizzas/:id', async (req, res) => {
	try {
		const { populate } = req.query

		const fieldsToPopulate = typeof populate === 'string' ? populate.split(',') : []

		const data = await Pizza.findById(req.params.id)
			.populate(fieldsToPopulate)
			.exec()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

pizzas.get('/api/pizzas', async (req, res) => {
	try {
		const { populate } = req.query

		const fieldsToPopulate = typeof populate === 'string' ? populate.split(',') : []

		const data = await Pizza.find()
			.populate(fieldsToPopulate)
			.exec()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

pizzas.post('/api/pizzas', async (req, res) => {
	try {
		await bodyValidator(PizzaDTO, req.body)

		const newPizza = new Pizza({
			name: req.body.name,
			ingredients: req.body.ingredients,
			operations: req.body.operations
		})

		const savedPizza = await newPizza.save()

		if (req.body.ingredients && req.body.ingredients.length > 0) {
			await Ingredient.updateMany(
				{ _id: { $in: req.body.ingredients } },
				{ $addToSet: { pizzas: savedPizza._id } }
			)
		}

		if (req.body.operations && req.body.operations.length > 0) {
			await Operation.updateMany(
				{ _id: { $in: req.body.operations } },
				{ $addToSet: { pizzas: savedPizza._id } }
			)
		}

		res.status(201).json(savedPizza)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

pizzas.patch('/api/pizzas/:id', async (req, res) => {
	const { id } = req.params
	const updatedData = req.body

	try {
		await bodyValidator(PizzaDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}

	try {
		const pizza = await Pizza.findById(id)

		if (!pizza) {
			return res.status(404).json({ message: 'Pizza not found' })
		}

		const previousIngredients = pizza.ingredients
		const previousOperations = pizza.operations

		const updatedPizza = await Pizza.findByIdAndUpdate(id, updatedData, { new: true })

		if (
			updatedData.ingredients &&
			JSON.stringify(previousIngredients) !== JSON.stringify(updatedData.ingredients)
		) {
			await Ingredient.updateMany(
				{ _id: { $in: previousIngredients } },
				{ $pull: { pizzas: updatedPizza._id } }
			)

			await Ingredient.updateMany(
				{ _id: { $in: updatedData.ingredients } },
				{ $addToSet: { pizzas: updatedPizza._id } }
			)
		}
		if (
			updatedData.operations &&
			JSON.stringify(previousOperations) !== JSON.stringify(updatedData.operations)
		) {
			await Operation.updateMany(
				{ _id: { $in: previousOperations } },
				{ $pull: { pizzas: updatedPizza._id } }
			)

			await Operation.updateMany(
				{ _id: { $in: updatedData.operations } },
				{ $addToSet: { pizzas: updatedPizza._id } }
			)
		}

		res.status(200).json(updatedPizza)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
pizzas.delete('/api/pizzas/:id', async (req, res) => {
	const { id } = req.params

	try {
		const deletedPizza = await Pizza.findByIdAndRemove(id)

		if (!deletedPizza) {
			return res.status(404).json({ message: 'Pizza not found' })
		}

		await Ingredient.updateMany(
			{ pizzas: id },
			{ $pull: { pizzas: id } }
		)

		await Operation.updateMany(
			{ pizzas: id },
			{ $pull: { pizzas: id } }
		)

		res.status(200).json({ message: 'Pizza deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
export default pizzas
