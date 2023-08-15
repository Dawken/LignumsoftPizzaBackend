import { Router } from 'express'
import { bodyValidator } from '../../shared/bodyValidator'
import { IngredientDTO } from './ingredientsDTO'
import Operation from '../operations/operationsModel'
import Ingredient from '../ingredients/ingredientsModel'
import Pizza from '../pizzas/pizzasModel'

const ingredients = Router()


ingredients.get('/api/ingredients/:id', async (req, res) => {
	try {
		const { populate } = req.query

		const fieldsToPopulate = typeof populate === 'string' ? populate.split(',') : []

		const data = await Ingredient.findById(req.params.id)
			.populate(fieldsToPopulate)
			.exec()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

ingredients.get('/api/ingredients/', async (req, res) => {
	try {
		const { populate } = req.query

		const fieldsToPopulate = typeof populate === 'string' ? populate.split(',') : []

		const data = await Ingredient.find()
			.populate(fieldsToPopulate)
			.exec()
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
ingredients.post('/api/ingredients', async (req, res) => {
	try {
		await bodyValidator(IngredientDTO, req.body)

		const newIngredient = new Ingredient({
			name: req.body.name,
			operation: req.body.operation,
			pizzas: req.body.pizzas
		})

		const savedIngredient = await newIngredient.save()

		if (req.body.operation) {
			await Operation.findByIdAndUpdate(
				req.body.operation,
				{ $addToSet: { ingredients: savedIngredient._id } }
			)
		}

		if (req.body.pizzas && req.body.pizzas.length > 0) {
			await Pizza.updateMany(
				{ _id: { $in: req.body.pizzas } },
				{ $addToSet: { ingredients: savedIngredient._id } }
			)
		}

		res.status(201).json(savedIngredient)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
ingredients.patch('/api/ingredients/:id', async (req, res) => {
	const { id } = req.params
	const updatedData = req.body

	try {
		await bodyValidator(IngredientDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}

	try {
		const ingredient = await Ingredient.findById(id)

		if (!ingredient) {
			return res.status(404).json({ message: 'Ingredient not found' })
		}

		const previousPizzas = ingredient.pizzas
		const previousOperations = ingredient.operation

		const updatedIngredient = await Ingredient.findByIdAndUpdate(id, updatedData, { new: true })

		if (
			updatedData.pizzas &&
			JSON.stringify(previousPizzas) !== JSON.stringify(updatedData.pizzas)
		) {
			await Pizza.updateMany(
				{ _id: { $in: previousPizzas } },
				{ $pull: { ingredients: updatedIngredient._id } }
			)

			await Pizza.updateMany(
				{ _id: { $in: updatedData.pizzas } },
				{ $addToSet: { ingredients: updatedIngredient._id } }
			)
		}

		if (
			updatedData.operations &&
			JSON.stringify(previousOperations) !== JSON.stringify(updatedData.operations)
		) {
			await Operation.updateMany(
				{ _id: { $in: previousOperations } },
				{ $pull: { ingredients: updatedIngredient._id } }
			)

			await Operation.updateMany(
				{ _id: { $in: updatedData.operations } },
				{ $addToSet: { ingredients: updatedIngredient._id } }
			)
		}

		res.status(200).json(updatedIngredient)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
ingredients.delete('/api/ingredients/:id', async (req, res) => {
	const { id } = req.params

	try {
		const deletedIngredient = await Ingredient.findByIdAndRemove(id)

		if (!deletedIngredient) {
			return res.status(404).json({ message: 'Ingredient not found' })
		}

		await Pizza.updateMany(
			{ ingredients: id },
			{ $pull: { ingredients: id } }
		)

		await Operation.updateMany(
			{ ingredients: id },
			{ $pull: { ingredients: id } }
		)

		res.status(200).json({ message: 'Ingredient deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
export default ingredients
