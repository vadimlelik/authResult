import { Router } from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import Role from '../model/roleModel.js'

const router = new Router()

router.get('/', authMiddleware, async (req, res) => {
	try {
		const allRoles = await Role.find()
		return res.status(200).json(allRoles)
	} catch (e) {
		console.log(e)
	}
})

export default router
