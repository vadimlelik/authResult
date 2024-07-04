import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import authRoute from './route/authRoute.js'
import postRoute from './route/postRoute.js'
import userRoute from './route/userRoute.js'
import roleRoute from './route/roleRoute.js'
import Role from './model/roleModel.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())
dotenv.config()

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/posts', postRoute)
app.use('/api/v1/roles', roleRoute)

const createDefaultRoles = async () => {
	const roles = await Role.find()
	if (roles.length === 0) {
		await Role.create({ name: 'user' })
		await Role.create({ name: 'admin' })
		console.log('Default roles created')
	} else {
		console.log('Default roles already exist')
	}
}

const start = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/auth')
		await createDefaultRoles()

		app.listen(process.env.PORT, () => {
			console.log(`Server started on port ${process.env.PORT}`)
		})
	} catch (e) {}
}

start()
