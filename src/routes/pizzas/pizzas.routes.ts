import { Router } from 'express'
import Pizza from './pizzasModel'
import { bodyValidator } from '../../shared/bodyValidator'
import { PizzaDTO } from './pizzasDTO'


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
		const data = new Pizza({
			pizzaName: req.body.pizzaName,
			ingredients: req.body.ingredients,
			operations: req.body.operations
		})
		const dataToSave = data.save()
		res.status(201).json(dataToSave)
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
		const { id } = req.params

		const result = await Pizza.findByIdAndUpdate(id, updatedData)
		res.status(200).send(result)

	} catch (error) {
		res.status(500).json({message: error.message})
	}
})
export default pizzas
