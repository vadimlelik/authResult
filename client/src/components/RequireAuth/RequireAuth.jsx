import {useSelector} from "react-redux";
import {getAuthUserRole, getIsLoggedIn} from "../../store/authSlice";
import {Navigate} from "react-router-dom";

const RequireAuth = ({children, roles}) => {

    const auth = useSelector(getIsLoggedIn);
    const userRoles = useSelector(getAuthUserRole)

    const hasRequiredRoles = () => {
        return userRoles?.some(role => {
            return roles.includes(role.name);
        })
    }

    if(!auth){
        return  <Navigate to={'/'}  />
    }

    if(!hasRequiredRoles()){
        return  <Navigate to={'/auth/sign-up'} />
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default RequireAuth