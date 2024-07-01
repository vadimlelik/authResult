import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchPost} from "../store/postSilce";

const PostLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPost())
    }, [dispatch]);

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default PostLayout