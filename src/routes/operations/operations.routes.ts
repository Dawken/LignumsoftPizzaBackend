import { Router } from 'express'
import Operation from './operationsModel'

const operations = Router()

operations.post('/api/operations', async (req, res) => {
	try {
		const data = new Operation({
			operation: req.body.operation,
			ingredient: req.body.ingredient,
			pizza: req.body.pizza
		})
		const dataToSave = data.save()
		res.status(201).json(dataToSave)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
operations.get('/api/operations/:id', async (req, res) => {
	try {
		const data = await Operation.findById(req.params.id)
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})
export default operations
