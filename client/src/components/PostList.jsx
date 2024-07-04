import { useSelector } from 'react-redux'
import { getPostsIsLoading } from '../store/selectors/ index'
import { getCurrentUserData } from '../store/usersSlice'
import { getRolesById } from '../store/roleSlice'
import { createSelector } from '@reduxjs/toolkit'

const PostList = () => {
	const { auth } = useSelector((state) => state.auth)
	const isLoadingRoles = useSelector((state) => state.role.isLoading)
	const user = useSelector(getCurrentUserData(auth.userId))

	// const rolesArray = useSelector(getRolesById(user?.role))

	const getRoles = createSelector(
		[
			(state) => state.role.entities,
			(state) => state.auth,
			(state) => state.users.entities,
		],
		(roleEntities, authUser, userEntities) => {
			const { auth } = authUser
			const findUser = userEntities.find((u) => u._id === auth.userId)
			const arrRole = []

			for (const roleId of roleEntities) {
				for (const userRoleId of findUser.role) {
					if (userRoleId === roleId._id) {
						arrRole.push(roleId)
					}
				}
			}
			return arrRole
		}
	)

	const role = useSelector(getRoles)

	const isLoading = useSelector(getPostsIsLoading())

	if (isLoading && isLoadingRoles) {
		return <h1>Loading...</h1>
	}

	return (
		<div>
			<h1>{user?.name}</h1>
			<div>
				Role
				<div>
					{role.map((role) => (
						<div key={role._id}>{role.name}</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PostList
