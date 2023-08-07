import { Router } from 'express'
import Pizza from './pizzasModel'
import { bodyValidator } from '../../shared/bodyValidator'
import { PizzaDTO } from './pizzasDTO'

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
pizzas.patch('/api/pizzas/:id', async (req, res) => {
	const updatedData = req.body
	try {
		await bodyValidator(PizzaDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
	try {
		const data = await Pizza.findById(req.params.id)

		if (JSON.stringify(updatedData) === '{}' ||
			JSON.stringify(data.ingredient) === JSON.stringify(updatedData.ingredient) ||
			JSON.stringify(data.operation) === JSON.stringify(updatedData.operation) ||
			data.pizza === updatedData.pizza) {
			return res.status(400).json({ errorCode: 'nothing-changed' })
		}
		const { id } = req.params

		const result = await Pizza.findByIdAndUpdate(id, updatedData)
		res.status(200).send(result)

	} catch (error) {
		res.status(500).json({message: error.message})
	}
})
export default pizzas
