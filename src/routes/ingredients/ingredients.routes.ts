import { Router } from 'express'
import Ingredient from './ingredientsModel'

const ingredients = Router()

ingredients.post('/api/ingredients', async (req, res) => {
	try {
		const data = new Ingredient({
			ingredient: req.body.ingredient,
			operation: req.body.operation,
			pizza: req.body.pizza
		})
		const dataToSave = data.save()
		res.status(201).json(dataToSave)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
ingredients.get('/api/ingredients/:id', async (req, res) => {
	try {
		const data = await Ingredient.findById(req.params.id)
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
export default ingredients
