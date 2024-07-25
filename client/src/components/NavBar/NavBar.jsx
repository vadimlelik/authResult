import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "../../store/authSlice";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn)
    return (
        <div className='nav_bar'>
            <nav className='nav_bar__container'>
                <ul className='nav_bar__list'>

                    <li className='nav_bar__item'>
                        <Link className="nav_bar__link" to='/auth/sign-up'>SignUp</Link>
                    </li>
                    <li className='nav_bar__item'>
                        <Link className="nav_bar__link" to='/auth/sign-in'>SignIn</Link>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li className='nav_bar__item'>
                                <Link className="nav_bar__link" to='/post-list'>Post List</Link>
                            </li>
                            <li className='nav_bar__item'>
                                <Link className="nav_bar__link" to='/'>Main</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default NavBar