import { Router } from 'express'
import Pizza from './pizzasModel'

const pizzas = Router()

pizzas.post('/api/pizzas', async (req, res) => {
	try {
		const data = new Pizza({
			pizza: req.body.pizza,
			ingredient: req.body.ingredient,
			operation: req.body.operation
		})
		const dataToSave = data.save()
		res.status(201).json(dataToSave)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
pizzas.get('/api/pizzas/:id', async (req, res) => {
	try {
		const data = await Pizza.findById(req.params.id)
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
export default pizzas
