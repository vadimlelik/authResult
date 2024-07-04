import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../store/usersSlice'
import { fetchRole } from '../store/roleSlice'

const AppLoader = ({ children }) => {
	const dispatch = useDispatch()

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
	const userStatusLoading = useSelector((state) => state.users.isLoading)

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(fetchUsers())
			dispatch(fetchRole())
		}
	}, [isLoggedIn, dispatch])

	if (userStatusLoading) {
		return <div>Loading...</div>
	}

	return children
}

export default AppLoader
