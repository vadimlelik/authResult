import { useSelector } from 'react-redux'
import { getPostsIsLoading } from '../store/selectors/ index'
import { getCurrentUserData } from '../store/usersSlice'
import { getRolesById } from '../store/roleSlice'

const PostList = () => {
	const { auth } = useSelector((state) => state.auth)
	const isLoadingRoles = useSelector((state) => state.role.isLoading)
	const user = useSelector(getCurrentUserData(auth.userId))

	const rolesArray = useSelector(getRolesById(user?.role))

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
					{rolesArray.map((role) => (
						<div key={role._id}>{role.name}</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PostList
