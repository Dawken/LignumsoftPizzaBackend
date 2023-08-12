import { Router } from 'express'
import Operation from './operationsModel'
import { bodyValidator } from '../../shared/bodyValidator'
import { OperationDTO } from './operationsDTO'

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
		const data = new Operation({
			operationName: req.body.operationName,
			ingredients: req.body.ingredients,
			pizzas: req.body.pizzas
		})
		const dataToSave = data.save()
		res.status(201).json(dataToSave)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

operations.patch('/api/operations/:id', async (req, res) => {
	const updatedData = req.body
	try {
		await bodyValidator(OperationDTO, req.body)
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
	try {
		const { id } = req.params

		const result = await Operation.findByIdAndUpdate(id, updatedData)
		res.status(200).send(result)

	} catch (error) {
		res.status(500).json({message: error.message})
	}
})
export default operations
