import {useSelector} from "react-redux";
import {getPosts, getPostsIsLoading} from "../store/selectors/ index";

const PostList = () => {
    const post = useSelector(getPosts());
    const isLoading = useSelector(getPostsIsLoading())


    if (isLoading) {
        return <h1>Loading...</h1>;
    }


    return (
        <ul style={{
            listStyleType: "none",

        }}>
            {post.map((post, index) => (<li style={{
                marginTop: "10px",
            }} key={index}>{post.title}</li>))}
        </ul>
    );
};

export default PostList