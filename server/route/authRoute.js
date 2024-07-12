import { Router } from 'express'
import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import TokenService from '../service/tokenService.js'
import Role from '../model/roleModel.js'

const router = new Router()

router.post('/signUp', async (req, res) => {
	try {
		const { email, password, name } = req.body
		const existingUser = await User.findOne({ email })

		const defaultRole = await Role.findOne({ name: 'user' })

		if (!defaultRole) {
			throw new Error('Default role not found')
		}

		if (existingUser) {
			return res.status(400).json({
				error: {
					message: 'User already exist',
					code: 400,
				},
			})
		}

		const hashedPassword = await bcrypt.hash(password, 12)

		const newUser = await User.create({
			name,
			password: hashedPassword,
			email,
			role: [defaultRole._id],
		})

		await newUser.save()

		const tokens = TokenService.generate({ _id: newUser._id })

		await TokenService.save(newUser._id, tokens.refreshToken)

		res.status(200).send({ ...tokens, userId: newUser._id })
	} catch (e) {
		console.error(e)
	}
})
router.post('/signIn', async (req, res) => {
	const { email, password } = req.body
	const existingUser = await User.findOne({
		email,
	})

	if (!existingUser) {
		return res.status(400).send({
			error: {
				message: 'email is not found ',
				code: 400,
			},
		})
	}

	const isPasswordEqual = await bcrypt.compare(password, existingUser.password)

	if (!isPasswordEqual) {
		return res.status(400).send({
			error: {
				message: 'invalid password',
				code: 400,
			},
		})
	}
	const tokens = TokenService.generate({ _id: existingUser._id })

	await TokenService.save(existingUser._id, tokens.refreshToken)
	res.status(200).send({ ...tokens, userId: existingUser._id })
})

function isTokenInvalid(data, dbToken) {
	return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

router.post('/token', async (req, res) => {
	try {
		const { refreshToken } = req.body
		const data = TokenService.validateRefresh(refreshToken)
		console.log(data)
		const dbToken = await TokenService.findToken(refreshToken)
		if (isTokenInvalid(data, dbToken)) {
			return res.status(400).send({ message: 'Unauthorized' })
		}
		const tokens = TokenService.generate({
			_id: data.id,
		})
		await TokenService.save(data._id, tokens.refreshToken)

		res.status(200).send({ ...tokens, userId: data._id })
	} catch (e) {
		res.status(400).send({ message: 'на сервере произошла ошибка' })
	}
})

export default router
