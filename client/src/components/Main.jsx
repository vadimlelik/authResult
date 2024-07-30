import {useDispatch, useSelector} from "react-redux";
import {getIdUser, logout} from "../store/authSlice";
import {Navigate, useNavigate} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import {getQualitiesByIds} from "../store/qualitySlice";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useSelector(getIdUser)
    const user = useSelector((state) => state.auth.user)
    const qualities = useSelector(getQualitiesByIds(user?.qualities))

    const handleLogout = () => {
        dispatch(logout(navigate))
    }
    if (!id) {
        return <Navigate to="/auth/sigin-up" />
    }

    return (
        <div>
            <p>{user?.name}</p>
            <ul>{user?.role.map((r) => <li key={r._id}>{r.name}</li>)}</ul>
            <Button onClick={handleLogout} colorScheme='teal'>Exit</Button>
            {qualities.length > 0 && qualities.map(quality => (<div key={quality._id}>{quality.name}</div>))}
        </div>
    );
};

export default Main