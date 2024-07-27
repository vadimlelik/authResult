import {Router} from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import User from '../model/userModel.js'

const router = new Router()

router.get('/', authMiddleware, async (req, res,next) => {
    try {
        const allUsers = await User.find()
        if (allUsers.length === 0) {
            return res.status(404).json({ message: 'No users found' })
        }
        return res.status(200).json(allUsers)
    } catch (e) {
        next(e)
    }
})
router.get('/me', authMiddleware, async (req, res,next) => {
    try {
        const {_id} = req.user
        const user = await User.findById(_id).populate('role')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})

router.get('/:id', authMiddleware, async (req, res,next) => {
    try {
        const {id} = req.params
        const user = await User.findById(id).populate('role')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})


export default router
