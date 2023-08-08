import { Router } from 'express'
import Ingredient from './ingredientsModel'
import { bodyValidator } from '../../shared/bodyValidator'
import { IngredientDTO } from './ingredientsDTO'


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
ingredients.patch('/api/ingredient/:id', async (req, res) => {
	const updatedData = req.body
	try {
		await bodyValidator(IngredientDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
	try {
		const { id } = req.params

		const result = await Ingredient.findByIdAndUpdate(id, updatedData)
		res.status(200).send(result)

	} catch (error) {
		res.status(500).json({message: error.message})
	}
})
export default ingredients
