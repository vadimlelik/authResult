import {useSelector} from "react-redux";
import {getAllPosts, getPostIsError, getPostIsLoading} from "../store/postSilce";

const PostList = () => {

	const isLoading = useSelector(getPostIsLoading);
	const posts = useSelector(getAllPosts);
	const error = useSelector(getPostIsError);

	if(isLoading){
		return <h1>...Loading</h1>
	}
	if(error){
		return  <h1>{error}</h1>
	}

	return (
		<div>
			<h1>postList</h1>
			{posts.map((post) => (<div key={post._id} >{post.content}</div>))}
		</div>
	)
}

export default PostList
