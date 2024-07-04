import {useSelector} from "react-redux";
import {getPostsIsLoading} from "../store/selectors/ index";
import {getCurrentUserData} from "../store/usersSlice";

const PostList = () => {

    const {auth} = useSelector((state) => state.auth);
    const user = useSelector(getCurrentUserData(auth.userId));
    const isLoading = useSelector(getPostsIsLoading())

    if (isLoading) {
        return <h1>Loading...</h1>;
    }


    return (
        <h1>{user?.name}</h1>
    );
};

export default PostList